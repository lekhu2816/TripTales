import { hashPassword } from "../utils/hashPassword.js";
import { userModel } from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js";
import { sendOTPEmail,sendWelcomeMail } from "../utils/sendMail.js";
// ----------------------------Signup---------------------------//

const signup=async(req,res)=>{
try {
    const {name,email,password}=req.body;
 if(!name||!email||!password){
    return res.status(400).json({
        success:false,
        messgae:"All fields are required"
    })
 }
 const user=await userModel.findOne({email});
 if(user){
    return res.status(400).json({
        success:false,
        messgae:"User already exist"
    })
 }
 const verificationToken=Math.floor(100000+Math.random()*900000);
 const hashedPassword=await hashPassword(password);
 const newUser=new userModel({
    name:name,
    email:email,
    password:hashedPassword,
    verificationToken:verificationToken,
    verificationTokenExpiresAt:Date.now()+5*60*1000
 })
 await newUser.save();
 sendOTPEmail(verificationToken, email);
 res.status(200).json({
    success:true,
    message:"OTP is sent to your Email"
 })
} catch (error) {
    res.status(500).json({
        success:false,
        message:"Error Occured while signup"
     })
}
}

// ----------------------------verify---------------------------//

const verify=async(req,res)=>{
    const { otp, email } = req.body;
    try {
      if (!otp || !email) {
        return res.status(400).json({
          success: flase,
          message: "All fields are required",
        });
      }
      let user = await userModel.findOne({ email });
  
      if (Date.now() > user.verificationTokenExpiresAt) {
        return res.status(401).json({
          success: false,
          message: "OTP Expired",
        });
      }
  
      if (otp != user.verificationToken) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }
  
      await userModel.findOneAndUpdate({ email }, { isVerified: true });
      const token = generateToken(user._id);
      sendWelcomeMail(email, user.name);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        success: true,
        message: "Account Created Successfully",
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Error While verifying user",
      });
    }
}


//----------------------------- resend otp--------------------------------//

const resendOTP = async (req, res) => {
    const { email } = req.body;
    try {
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email required",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exist",
        });
      }
      const verificationToken = Math.floor(100000 + Math.random() * 900000);
      const verificationTokenExpiresAt = Date.now() + 15 * 60 * 1000;
      await userModel.findOneAndUpdate(
        { email },
        {
          verificationToken: verificationToken,
          verificationTokenExpiresAt: verificationTokenExpiresAt,
        }
      );
      sendOTPEmail(verificationToken, email);
      res.status(200).json({
        success: true,
        message: "OTP is send to your registered email",
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Error occured while sending otp",
      });
    }
  };
  

// ----------------------------Signin---------------------------//

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields required",
        });
      }
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User doesn't exist",
        });
      }
  
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Incorrect Password",
        });
      }
  
      const token = generateToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        success: true,
        message: "User login successfully",
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Error occured while signin",
      });
    }
  };
  

// ----------------------------logout---------------------------//

const logout = async (req, res) => {
    try {
      res.clearCookie("token",{
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0}
      );
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while logging out",
      });
    }
  };


export {signup,verify,signin,logout,resendOTP}