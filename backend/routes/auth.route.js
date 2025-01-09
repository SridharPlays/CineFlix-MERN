import express from "express";
import multer from "multer";
import path from "path";
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth, updateUserProfile, deleteProfile } from "../controllers/auth.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router();

// Set up Multer storage 
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads/'); // Save files to the 'uploads' directory 
        }, filename: (req, file, cb) => { 
            cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename 
            } 
        }); 
        const upload = multer({ storage });

router.get("/check-auth", verifyToken, checkAuth);
// Runs when user visits /signup page 
router.post("/signup", signup);

router.post("/login", login)

router.post("/logout", logout)

router.post("/verify-email", verifyEmail)

router.post("/forgot-password", forgotPassword)

router.post("/reset-password/:token", resetPassword)

router.delete("/delete-account", deleteProfile)

router.post("/edit-profile", upload.single('profile'), updateUserProfile)



export default router;