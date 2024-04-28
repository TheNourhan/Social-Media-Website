const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email, verificationCode) => {
    try {
        await transporter.sendMail({
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Email Verification from Trekkers',
            text: `Your verification code is: ${verificationCode}`,
            html: `<p>Welcome to the Trekkers, <br>Your verification code is: <b>${verificationCode}</b></p>`
        });
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = sendVerificationEmail;
