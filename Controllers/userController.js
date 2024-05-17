import User from "../Models/userSchema.js";
import bcrypt from 'bcrypt';
import mail from "../Services/nodemail.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import chroma from "chroma-js";
import { calculateComplementaryColor, colorMap, convertColorToHex, determineWeatherCondition, fetchWeatherData, suggestColorBasedOnOccasion, suggestColorBasedOnPreferences } from "../Services/weather.js";

dotenv.config()

export const registerUser = async(req,res) => {
    try {
        const {username, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        console.log("hashPassword", hashPassword);


        const newUser = new User ({username, email, password:hashPassword})
        await newUser.save()

        res.status(200).json({message: "User registered successfully", data: newUser })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Registeration Failed, Internal server error'})
    }
}

export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({error:"User Not Found"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({error:"Invalid Password"})
        }

        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        user.token = token;
        await user.save();
        res.status(200).json({message:"Login Successful", token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Login Failed, Internal server error'})
    }
}

export const getUser = async(req,res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User information retrieved successfully", data: [user] });
    } catch (error) {
       console.log(error); 
    }
}

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetToken = resetToken;
        await user.save();

        const resetLink = `https://dresssuggestion-frontend.netlify.app/reset-password/${resetToken}`;
        await mail(email, 'Password Reset Request', `Click this link to reset your password: ${resetLink}`);

        res.status(200).json({ message: "Check your mail for the reset link" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const redirectToResetPassword = async (req, res) => {
    try {
        const { token } = req.params;

        console.log(`Received GET request to redirect-reset-password with token: ${token}`);

        if (!token) {
            console.log('Token is missing in the request');
            return res.status(400).json({ error: 'Token is missing in the request' });
        }

        // Proceed with redirection
        res.redirect(`http://localhost:5173/reset-password/${token}`);
    } catch (error) {
        console.error('Error occurred during redirection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const resetToken = req.params.token;
        const newPassword = req.body.password;

        const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);
        if (!decodedToken || !decodedToken._id) {
            return res.status(400).json({ error: 'Invalid reset token' });
        }

        const user = await User.findById(decodedToken._id);
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        user.resetToken = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ error: 'Reset token has expired' });
        }
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const userPreference = async (req, res) => {
    try {
        const { userId } = req.params;
        const {skinTone, location } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, {
            skinTone: skinTone,
            location: location, 
        }, { new: true }); 

        res.status(200).json({ message: "User preferences updated successfully", data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const dressSuggestion = async (req, res) => {
    try {
        const { userId } = req.params;
        const { occasion } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const weatherData = await fetchWeatherData(user.location);
        const weatherCondition = determineWeatherCondition(weatherData);
        console.log('weather condition', weatherCondition )

        const suggestedColor = suggestColorBasedOnOccasion(occasion, user.skinTone) || suggestColorBasedOnPreferences(weatherCondition, user.skinTone)

        res.status(200).json({ message: "Dress color suggestion", color: suggestedColor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



export const getShadesOfColor = async (req, res) => {
    try {
        const { colorName } = req.params;
        const baseColor = colorMap[colorName.toLowerCase()];
        if (!baseColor) {
            return res.status(404).json({ error: "Color not found" });
        }

       
        const shades = chroma.scale([baseColor, 'black']).mode('lab').colors(6);

       
        const lighterShades = shades.map(color => chroma(color).luminance(0.8).hex());

       
        const combinedShades = [...shades, ...lighterShades];

        res.status(200).json({ shades: combinedShades });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



export const getComplementaryColor = async (req, res) =>  {
    try {
        let givenColor = req.params.colorName;
        
        givenColor = convertColorToHex(givenColor);
        const complementaryColor = calculateComplementaryColor(givenColor);
        const cleanedColor = complementaryColor.replace('#', '');
        const colorHexLink = `https://www.color-hex.com/color/${cleanedColor}`;

        res.json({ complementaryColor, colorHexLink });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}





