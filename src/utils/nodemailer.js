import nodemailer from "nodemailer";
import { envObj } from "../config/envConfig.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: envObj.gmailAddress,
    pass: envObj.gmailAppPassword,
  },
});

export const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed:", err);
  }
};

export const sendMail = async ({ email, subject, body }) => {
  try {
    const info = await transporter.sendMail({
      from: envObj.gmailAddress, // sender address
      to: email, // list of recipients
      subject: subject, // subject line
      html: body, // HTML body
    });

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail:", err);
  }
};
