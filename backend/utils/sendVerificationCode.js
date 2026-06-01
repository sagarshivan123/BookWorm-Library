import { sendEmail } from "./sendEmail.js";
import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js";

export async function sendVerificationCode(
  verificationCode,
  email,
  name
) {
  try {
    const result = await sendEmail({
      to: email,
      name,
      otp: verificationCode,
    });

    console.log("📧 sendEmail result:", result);

    return {
      success: true,
      message: "Verification code sent successfully",
    };
  } catch (err) {
    console.error("❌ Error in sendVerificationCode:", err.message);

    return {
      success: false,
      message: "Verification code failed to send",
      error: err.message,
    };
  }
}

