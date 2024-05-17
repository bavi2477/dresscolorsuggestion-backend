import axios from 'axios';
import convert from 'color-convert'

export const fetchWeatherData = async (location) => {
    try {
        const apiKey = '75323973d12ed72ace6199c914faec94';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
        const response = await axios.get(apiUrl);
        console.log('weather data', response.data);
        return response.data;
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};


export const determineWeatherCondition = (weather) => {
    const temperature = weather.main.temp;
    const precipitation = weather.weather[0].main; 

    if (temperature > 25 && precipitation === 'Clear') {
        return 'Sunny';
    } else if (precipitation === 'Rain' || precipitation === 'Drizzle') {
        return 'Rainy';
    } else if (temperature < 10) {
        return 'Cold';
    } else {
        return 'Moderate';
    }
}


export const suggestColorBasedOnPreferences = ( weatherCondition, skinTone) => {

    if (weatherCondition === 'Sunny') {
        if (skinTone === 'light') {
            return 'Light Blue' ;
        } else if (skinTone === 'medium') {
            return  'Beige' ;
        } else if (skinTone === 'dark') {
            return   'Pastel Colors ';
        }
    } else if (weatherCondition === 'Rainy') {
        if (skinTone === 'light') {
            return 'Black for Light Skin';
        } else if (skinTone === 'medium') {
            return 'Navy Blue for Medium Skin';
        } else if (skinTone === 'dark') {
            return 'Charcoal for Dark Skin';
        }
    } else if (weatherCondition === 'Cold') {
        if (skinTone === 'light') {
            return  'Pastel Pink';
        } else if (skinTone === 'medium') {
            return  'Burgundy';
        } else if (skinTone === 'dark') {
            return  'Navy';
        }
    } else if (weatherCondition === 'Moderate') {
        if (skinTone === 'light') {
            return  'Mauve';
        } else if (skinTone === 'medium') {
            return  'Teal' ;
        } else if (skinTone === 'dark') {
            return  'Olive green' ;
        }
    }
    else {
        return 'Your Favorite Color';
    }
}


export const suggestColorBasedOnOccasion = (occasion, skinTone) => {
    const lowerCaseOccasion = occasion.toLowerCase();

    if (lowerCaseOccasion === 'wedding') {
        if (skinTone === 'light') {
            return 'Soft Peach';
        } else if (skinTone === 'medium') {
            return 'Lavender';
        } else if (skinTone === 'dark') {
            return 'Mint Green';
        }
    } else if (lowerCaseOccasion === 'interview') {
        if (skinTone === 'light') {
            return 'Light Gray';
        } else if (skinTone === 'medium') {
            return 'Navy Blue';
        } else if (skinTone === 'dark') {
            return 'Charcoal';
        }
    } else if (lowerCaseOccasion === 'party') {
        if (skinTone === 'light') {
            return 'Coral';
        } else if (skinTone === 'medium') {
            return 'Emerald Green';
        } else if (skinTone === 'dark') {
            return 'Bold Red';
        }
    } else if (lowerCaseOccasion === 'funeral') {
        return 'Black';
    } else if (lowerCaseOccasion === 'casual') {
        if (skinTone === 'light') {
            return 'Sky Blue';
        } else if (skinTone === 'medium') {
            return 'Olive Green';
        } else if (skinTone === 'dark') {
            return 'Mustard Yellow';
        }
    }

    return null;
}


export const colorMap = {
    "red": "#FF0000",
    "green": "#00FF00",
    "blue": "#0000FF",
    "yellow": "#FFFF00",
    "cyan": "#00FFFF",
    "magenta": "#FF00FF",
    "orange": "#FFA500",
    "purple": "#800080",
    "pink": "#FFC0CB",
    "brown": "#A52A2A",
    "black": "#000000",
    "white": "#FFFFFF"
};


export const convertColorToHex = (color) => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        return color; 
    } else {
        const rgb = convert.keyword.rgb(color);
        if (!rgb) {
            throw new Error('Invalid color name');
        }
        const hex = '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
        return hex;
    }
}


export const calculateComplementaryColor = (color) => {
   
    color = color.replace('#', '');
    
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    
    let rComplementary = 255 - r;
    let gComplementary = 255 - g;
    let bComplementary = 255 - b;
    
    let complementaryColor = '#' + 
        rComplementary.toString(16).padStart(2, '0') + 
        gComplementary.toString(16).padStart(2, '0') + 
        bComplementary.toString(16).padStart(2, '0');
    
    return complementaryColor;
}