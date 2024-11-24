"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const _1 = __importDefault(require("."));
const transporter = nodemailer_1.default.createTransport({
<<<<<<< HEAD
    service: "gmail",
    auth: {
        user: _1.default.SMTP.username,
        password: _1.default.SMTP.password,
=======
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: _1.default.SMTP.username,
        pass: _1.default.SMTP.password,
>>>>>>> staging
    },
});
exports.default = transporter;
//# sourceMappingURL=MailConfig.js.map