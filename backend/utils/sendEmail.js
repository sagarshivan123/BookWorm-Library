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

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

export const sendEmail = async ({ to, name, otp }) => {
  const transporter = createTransporter();

  const words = String(otp).split("");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f4f8; padding: 40px 20px; }
        .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 40px 40px 32px; text-align: center; }
        .header h1 { color: #e94560; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
        .header p { color: #a0aec0; margin-top: 6px; font-size: 14px; }
        .body { padding: 40px; }
        .greeting { font-size: 18px; color: #2d3748; margin-bottom: 16px; }
        .greeting span { color: #e94560; font-weight: 600; }
        .description { color: #718096; font-size: 15px; line-height: 1.6; margin-bottom: 32px; }
        .otp-label { font-size: 12px; font-weight: 700; color: #a0aec0; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
        .otp-container { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 32px; }
        .otp-word { background: #1a1a2e; color: #e94560; padding: 12px 18px; border-radius: 8px; font-size: 16px; font-weight: 700; letter-spacing: 1px; border: 1px solid #e9456030; }
        .otp-full { background: #f7fafc; border: 2px dashed #e2e8f0; border-radius: 10px; padding: 14px 20px; text-align: center; font-family: monospace; font-size: 14px; color: #4a5568; margin-bottom: 32px; word-break: break-all; }
        .expiry { background: #fff5f5; border-left: 4px solid #e94560; padding: 12px 16px; border-radius: 0 8px 8px 0; font-size: 13px; color: #c53030; margin-bottom: 32px; }
        .note { font-size: 13px; color: #a0aec0; line-height: 1.6; }
        .footer { background: #f7fafc; padding: 24px 40px; text-align: center; }
        .footer p { font-size: 12px; color: #a0aec0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
          <p>Verify your account to get started</p>
        </div>
        <div class="body">
          <p class="greeting">Hello!!</p>
          <p class="description">
            You're almost there! Use the 5-word verification code below to confirm your email address and complete your registration.
          </p>
          <p class="otp-label">Your verification code</p>
          <div class="otp-container">
            ${words.map(w => `<span class="otp-word">${w}</span>`).join("")}
          </div>
          <div class="expiry">⏱ This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</div>
          <p class="note">If you didn't create an account, you can safely ignore this email. Someone may have entered your email address by mistake.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "🔐 Your Email Verification Code",
    html,
  });
};

// export const sendEmail = async ({ to, name, otp }) => {
//   try {
//     const transporter = createTransporter();

//     console.log({ to, name, otp });

//     const words = String(otp).split("");

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_FROM,
//       to,
//       subject: "🔐 Your Email Verification Code",
//       html,
//     });

//     console.log("MAIL SENT:", info);

//     return {
//       success: true,
//       info,
//     };
//   } catch (error) {
//     console.error("MAIL ERROR:", error);

//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };