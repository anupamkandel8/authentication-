//used mailtraper and nodemailer

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    let user;
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
   

    if (emailType === "VERIFY") {
      user = await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true } // this returns the updated user
      );
    }


    if (emailType === "RESET") {
      user = await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true } // this returns the updated user
      );

      if (!user) {
        throw new Error("User not found");
      }
    }

    //copied from nodemailer docs
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "72493a36f42322",
        pass: "c119c3ecdb62cb",
      },
    });

    await transport.sendMail({
      from: "anupamkandel8@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html:
        "<p>Click the link below to " +
        (emailType === "VERIFY" ? "verify your email" : "reset your password") +
        ":</p>" +
        `<a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verify" : "reset-password"}?token=${hashedToken}">Click here</a>`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    //throw new Error("Email sending failed");
  }
}
