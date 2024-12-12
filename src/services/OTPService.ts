import config from "../config";
import transporter from "../config/MailConfig";
import db from "../db";

export default class OTPService {
  private otpCollection;

  constructor() {
    this.otpCollection = db.collection("otp"); // Firestore collection reference
  }

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

      // Setting data in the Firestore OTP collection
      await this.otpCollection
        .doc(user_id + OTP) // Creates a document with a unique ID
        .set({
          expired_at: new Date(Date.now() + 60000), // Set expiration time for the OTP
        });

      const mailOptions = {
        from: config.SMTP.username,
        to: email,
        subject: "Beauskin OTP",
        text:
          "Hai, \n\nThis is an automated email sent to you to provide the One-Time Password (OTP) code required to access your account. \nYour OTP code is   " +
          OTP,
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

    // Getting data from the Firestore OTP collection
    const otp = await this.otpCollection
      .doc(id + inputOTP) // Fetches the document based on the ID and OTP
      .get();

    if (!otp.exists) {
      return false;
    }

    const otpData = otp.data();
    const now = new Date();
    if (otpData.expired_at.toDate() < now) {
      return false;
    }

    await this.otpCollection.doc(id + inputOTP).delete();

    return true;
  }
}
