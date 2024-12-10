import express from 'express'
import { logout, resendOTP, signin, signup ,verify} from '../controller/auth.controller.js';
const authRoute=express.Router()

authRoute.post('/signup',signup);
authRoute.post('/verify',verify);
authRoute.post('/signin',signin);
authRoute.post('/logout',logout);
authRoute.post('/resend-otp',resendOTP);

export default authRoute;