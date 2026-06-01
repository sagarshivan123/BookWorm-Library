import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log("email send...")
    console.log(process.env.SMTP_MAIL);
console.log(process.env.SMTP_PASSWORD);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

    const mailOptions = {
      from: `"Bookworm Library" <${process.env.SMTP_MAIL}>`,
      to: email,
      subject,
      html: message,
    };
    await transporter.verify();
    console.log("SMTP Connected");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };

  }catch (error) {
    console.error("❌ Email send failed:");
    console.error(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
