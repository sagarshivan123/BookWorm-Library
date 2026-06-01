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

import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log("=== SEND EMAIL STARTED ===");
    console.log("SMTP_MAIL:", process.env.SMTP_MAIL);
    console.log("SMTP_HOST:", process.env.SMTP_HOST);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });

    const info = await transporter.sendMail({
      from: `"Bookworm Library" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject,
      html: message,
    });

    console.log("✅ Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
};