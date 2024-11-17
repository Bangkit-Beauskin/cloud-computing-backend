"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const _1 = __importDefault(require("."));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: _1.default.SMTP.username,
        password: _1.default.SMTP.password,
    },
});
exports.default = transporter;
//# sourceMappingURL=MailConfig.js.map