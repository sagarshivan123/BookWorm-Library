// import nodemailer from "nodemailer";

// export const sendEmail = async ({ email, subject, message }) => {
//   try {
//     console.log("email send...")
//     console.log(process.env.SMTP_MAIL);
// console.log(process.env.SMTP_PASSWORD);
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.SMTP_MAIL,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

//     const mailOptions = {
//       from: `"Bookworm Library" <${process.env.SMTP_MAIL}>`,
//       to: email,
//       subject,
//       html: message,
//     };
//     await transporter.verify();
//     console.log("SMTP Connected");
//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent:", info.messageId);
//     return { success: true, messageId: info.messageId };

//   }catch (error) {
//     console.error("FULL ERROR:", error);
//     console.error("CODE:", error.code);
//     console.error("COMMAND:", error.command);
  
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject,
      html: message,
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};