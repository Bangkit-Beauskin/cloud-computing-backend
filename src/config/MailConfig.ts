import nodemailer from "nodemailer";
import config from ".";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: config.SMTP.username,
    pass: config.SMTP.password,
  },
});

export default transporter;
