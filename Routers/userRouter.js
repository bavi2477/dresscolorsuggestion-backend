import express from 'express';
import { dressSuggestion, getComplementaryColor, getShadesOfColor, getUser, loginUser, redirectToResetPassword, registerUser, requestPasswordReset, resetPassword, userPreference} from '../Controllers/userController.js';
import User from '../Models/userSchema.js';
import authMiddleware from '../MIddleware/auth.middleware.js';
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getuser', authMiddleware, getUser)
router.post('/forgot-password', requestPasswordReset)
router.get('/reset-password/:token', redirectToResetPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/user-preference/:userId', userPreference)
router.post('/dress-suggestion/:userId', dressSuggestion)
router.get('/shades/:colorName', getShadesOfColor)
router.get('/complementary/:colorName', getComplementaryColor)


export default router;