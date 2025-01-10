import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail, sendAccountDeletionEmail } from "../mailtrap/emails.js";
import crypto from "crypto";
import dotenv from "dotenv";
import { profile } from "console";

dotenv.config();

export const signup = async (req,res) => {
    const { email, password, name } = req.body;
    try {
        // Checks if the Fields are empty
        if(!email || !password || !name) {
            throw new Error("All Fields are Required!"); // Throw Error to Display it later.
        }

        // Variable to check whether the user exist or not!
        const userAlreadyExist = await User.findOne({email}); // Finding Email Field in collections
        if(userAlreadyExist) {
            // If Exist, Send The Message
            return res.status(400).json({success: false, message: "User Already Exist"}) 
        }

        const hashedPassword = await bcryptjs.hash(password, 10); // Hashing Password
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Creating  a Verification Code
        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 Hours
        });

        await user.save();

        // Generate JWT TOken and Create a Cookie
        generateTokenAndSetCookie(res, user._id);

        // Verification Mail Sender Function
        await sendVerificationEmail(user.email,verificationToken)

        res.status(201).json({success: true, message: "User Created Successfully", 
            user: {
                ...user._doc,
                password: undefined 
            }
        })

    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({success: false, message: "Invalid Credentials"})
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: "Invalid Credentials"})
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })

        } catch (error) {
            console.log("Error in login ", error);
            res.status(400).json({sucess:false, message: error.message })
    }
}

export const logout = async (req,res) => {
    res.clearCookie("token")
    res.status(200).json({success: true, message: "Logged out Successfully"})
}


// Verify API
export const verifyEmail = async (req,res) => {
    const { code } = req.body; // Fetch User Input
    // Check if token expired or not
    try {
        const user = await User.findOne( {
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or Expired Verification Code"})
        }

        // If Verified, change the value
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save(); // save


        // send welcome
        await sendWelcomeEmail(user.email, user.name);
        
        res.status(200).json({success: true, message: "Email Verified Successfully", user: {
            ...user._doc,
            password: undefined
        }});

    } catch (error) {
        console.log("Error in Verify Email", error)
        res.status(500).json({sucess:false, message: "Server Error"})
    }
}


export const forgotPassword = async (req,res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({success: false, message: "Email Doesn't Exist"});
        }

        // Generate Reset Token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 0.1 * 60 * 60 * 1000; // 10Minute

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        // Send email 
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Email Sent Successfully"});
    } catch (error) {
        console.log("Error in Sending Forgot Email", error)
        res.status(400).json({sucess:false, message: error.message})
    }
}


export const resetPassword = async (req,res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now()}  // gt = greater than
        });

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or Expired Reset Token"})
        }

        //Update Pass
        const hashedPassword = await bcryptjs.hash(password, 10); // Hashing Password

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: "Password Reset Successful"});
    } catch (error) {
        console.log("Error in Reset Password", error)
        res.status(400).json({sucess:false, message: error.message})
    }
}


export const checkAuth = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); // remove password 
        if(!user) {
            return res.status(400).json({sucess:false, message: "User Not Found"})
        }

        res.status(200).json({success: true, user})
    } catch (error) {
        console.log("Error in CheckAuth", error)
        res.status(400).json({sucess:false, message: error.message})
    }
}

export const updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const profilePath = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const revisiedPath = process.env.CLIENT_URL + "/" + profilePath;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name || user.name;
      if (profilePath) user.profile = revisiedPath;
  
      await user.save();
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: 'Error updating profile' });
    }
  };
  

export const deleteProfile = async (req, res) => {
    try {
      const { email, name }= req.body;

      sendAccountDeletionEmail(email, name);
      
      const user = await User.findOneAndDelete({ email: email });
      
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        res.clearCookie("token");
        res.status(200).json({ message: 'Profile Deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error Deleting profile' });
    }
  };
  
  