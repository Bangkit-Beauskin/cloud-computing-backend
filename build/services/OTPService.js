"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RedisConfig_1 = require("../config/RedisConfig");
const MailConfig_1 = __importDefault(require("../config/MailConfig"));
const config_1 = __importDefault(require("../config"));
class OTPService {
    sendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const OTP = "";
            RedisConfig_1.redisClient.setex("users:" + email, 60000, OTP);
            const mailOptions = {
                from: config_1.default.SMTP.username,
                to: email,
                subject: "Beauskin OTP",
                text: "Your OTP is " + OTP,
            };
            MailConfig_1.default.sendMail(mailOptions);
        });
    }
    verifyOTP(email, inputOTP) {
        return __awaiter(this, void 0, void 0, function* () {
            const OTP = RedisConfig_1.redisClient.get("users:" + email);
            if (inputOTP !== OTP) {
                return false;
            }
            return true;
        });
    }
}
exports.default = OTPService;
//# sourceMappingURL=OTPService.js.map