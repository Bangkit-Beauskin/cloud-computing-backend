"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const RedisConfig_1 = require("../config/RedisConfig");
const MailConfig_1 = __importDefault(require("../config/MailConfig"));
const config_1 = __importDefault(require("../config"));
class OTPService {
  generateOTP(length = 6) {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
  }
  sendOTP(email, user_id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const OTP = this.generateOTP();
        RedisConfig_1.redisClient.setex("users:" + user_id, 60000, OTP);
        const mailOptions = {
          from: config_1.default.SMTP.username,
          to: email,
          subject: "Beauskin OTP",
          text: "Your OTP is " + OTP,
        };

        MailConfig_1.default.sendMail(mailOptions, (error, success) => {
          if (error) {
            console.log("SMTP connection error:", error);
          } else {
            console.log("SMTP server is ready to send emails");
          }
        });
      } catch (e) {
        console.log(e);
      }
    });
  }
  verifyOTP(id, inputOTP) {
    return __awaiter(this, void 0, void 0, function* () {
      const OTP = yield RedisConfig_1.redisClient.get("users:" + id);
      if (inputOTP !== OTP) {
        return false;
      }
      yield RedisConfig_1.redisClient.del("users:" + id);
      return true;
    });
  }
}
exports.default = OTPService;
//# sourceMappingURL=OTPService.js.map
