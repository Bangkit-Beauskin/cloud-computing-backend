import { error } from "console";
import { redisClient } from "../config/RedisConfig";
import transporter from "../config/MailConfig";
import config from "../config";
import { text } from "stream/consumers";
import responseHandler from "../utils/responseHandler";

export default class OTPService {
  generateOTP(length = 6) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }

  public async sendOTP(email, user_id) {
    try {
      const OTP = this.generateOTP();
      redisClient.setex("users:" + user_id, 60000, OTP);
      const otp = await redisClient.get("users:" + user_id);

      console.log("otp " + otp + " user id " + user_id);

      const mailOptions = {
        from: config.SMTP.username,
        to: email,
        subject: "Beauskin OTP",
        text: "Your OTP is " + OTP,
      };

      console.log(
        "SMTP username ",
        config.SMTP.username,
        "SMTP PASS ",
        config.SMTP.password,
      );

      transporter.sendMail(mailOptions, (error, success) => {
        if (error) {
          console.log("SMTP connection error:", error);
        } else {
          console.log("SMTP server is ready to send emails");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  public async verifyOTP(id, inputOTP) {
    console.log("verify otp " + id + " " + inputOTP);
    const OTP = await redisClient.get("users:" + id);

    console.log("otp " + OTP);

    if (inputOTP !== OTP) {
      return false;
    }

    return true;
  }
}
