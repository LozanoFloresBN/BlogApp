import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // eslint-disable-next-line no-undef
        user: process.env.EMAIL_USER,
        // eslint-disable-next-line no-undef
        pass: process.env.EMAIL_PASS
    }
});

export const sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        // eslint-disable-next-line no-undef
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de verificación',
        text: `Tu código de verificación es: ${code}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};

export default sendVerificationEmail