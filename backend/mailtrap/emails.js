import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, ACCOUNT_DELETE_TEMPLATE } from "./emailTemplates.js"
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transportProtocol = nodemailer.createTransport(
    {
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_PASSWORD
        }
    }
);

export const sendVerificationEmail = async (email, verificationToken) => {    
        try {
            const response = await transportProtocol.sendMail({
                from: `"CINEFLIX" <${process.env.EMAIL_SENDER}>`,
                to: email,
                subject: "Verify Your Email",
                html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
                headers: { 'X-Category': 'Email Verification'}
            });
    
            console.log("Email Sent Successfully", response)
        } catch (error) {
                console.error(`Error sending email`, error);
                throw new Error(`Error Sending Verification Email: ${error}`)
        }
    }   

export const sendWelcomeEmail = async (email,name) => {
        try {
            const response = await transportProtocol.sendMail({
                from: `"CINEFLIX" <${process.env.EMAIL_SENDER}>`,
                to: email,
                subject: "🎬 Welcome to CINEFLIX - Your Ultimate Movie Destination!",
                html: WELCOME_EMAIL_TEMPLATE.replace("{username}", name),
                headers: { 'X-Category': 'Welcome'}
            });

            console.log("Welcome Email Sent Successfully", response)
        } catch (error) {
                console.error(`Error sending email`, error);
            throw new Error(`Error Sending Welcome Email: ${error}`)
        }
    }


export const sendPasswordResetEmail = async (email, resetURL) => {
        try {
            const response = await transportProtocol.sendMail({
                from: `"CINEFLIX" <${process.env.EMAIL_SENDER}>`,
                to: email,
                subject: "Reset Your Password",
                html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
                headers: { 'X-Category': 'Password Reset'}
            });

            console.log("Reset Password Email Sent!")
    } catch (error) {
            console.error(`Error sending email`, error);
        throw new Error(`Error Sending Reset Password Email: ${error}`)
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await transportProtocol.sendMail({
            from: `"CINEFLIX" <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            headers: { 'X-Category': 'Password Reset'}
        });

        console.log("Reset Success Email Sent!");
} catch (error) {
        console.error(`Error sending email`, error);
    throw new Error(`Error Sending Success ResetPassword: ${error}`)
}
}

export const sendAccountDeletionEmail = async (email, name) => {
    try {
        const response = await transportProtocol.sendMail({
            from: `"CINEFLIX" <${process.env.EMAIL_SENDER}>`,
            to: email,
            subject: "We're Sorry to See You Go",
            html: ACCOUNT_DELETE_TEMPLATE.replace("{username}", name),
            headers: { 'X-Category': 'Account Deletion'}
        });

        console.log("Deletion Request Accepted Email Sent!")
} catch (error) {
        console.error(`Error sending email`, error);
    throw new Error(`Error Sending Email: ${error}`)
}
} 