// import { mailtrapClient, sender} from "./mailtrap.config.js"

// export const sendVerificationEmail = async (email, verificationToken) => {
//     const recipient = [{email}]

//     try {
//         const response = await mailtrapClient.send({
    //             from: sender,
    //             to: recipient,
    //             subject: "Verify your Email",
//             html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
//             category: "Email Verification"
//         })

//         console.log("Email Sent Successfully", response)
//     } catch (error) {
    //         console.error(`Error sending email`, error);
    //         throw new Error(`Error Sending Verification Email: ${error}`)
//     }
// }   


// export const sendWelcomeEmail = async (email,name) => {
//     const recipient =[{email}];

//     try {
//         const response = await mailtrapClient.send({
    //             from: sender,
//             to: recipient,
//             template_uuid: "07076a38-6480-421b-8f38-09a12f2012c7",
//             template_variables: {
//                 name: name
//             }
//         })

//         console.log("Email Sent Successfully", response)
//     } catch (error) {
    //         console.error(`Error sending email`, error);
//         throw new Error(`Error Sending Verification Email: ${error}`)
//     }
// }

// export const sendPasswordResetEmail = async (email, resetURL) => {
    //     const recipient = [{email}];
    
    //     try {
        //         const response = await mailtrapClient.send({
            //             from: sender,
//             to: recipient,
//             subject: "Reset your Password",
//             html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
//             category: "Password Reset"
//         })
//     } catch (error) {
    //         console.error(`Error sending email`, error);
//         throw new Error(`Error Sending Verification Email: ${error}`)
//     }
// }

import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, ACCOUNT_DELETE_TEMPLATE } from "./emailtemplates.js"
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