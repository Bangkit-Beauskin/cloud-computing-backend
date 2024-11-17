"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const db_1 = __importDefault(require("../db"));
const bcrypt = __importStar(require("bcrypt"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const constant_1 = require("../config/constant");
const OTPService_1 = __importDefault(require("./OTPService"));
class AuthSercie {
    constructor() {
        this.userCollection = db_1.default.collection("users");
        this.otpService = new OTPService_1.default();
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userSnapshot = yield this.userCollection
                    .where("email", "==", body.email)
                    .get();
                if (userSnapshot.empty) {
                    return responseHandler_1.default.returnError(httpStatus.NOT_FOUND, constant_1.responseMessageConstant.USER_404_NOT_FOUND);
                }
                const user = userSnapshot.docs[0].data();
                const isPasswordValid = yield bcrypt.compare(body.password, user.password);
                if (!isPasswordValid) {
                    return responseHandler_1.default.returnError(httpStatus.BAD_REQUEST, "Wrong password");
                }
                this.otpService.sendOTP(body.email);
                return responseHandler_1.default.returnSuccess(httpStatus.OK, "User fetched");
            }
            catch (e) {
                console.log(e);
                return responseHandler_1.default.returnError(httpStatus.BAD_REQUEST, "Wrong password");
            }
        });
    }
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userCollection.add({
                    email: body.email,
                    password: bcrypt.hashSync(body.password),
                    is_verified: false,
                });
                this.otpService.sendOTP(body.email);
                return responseHandler_1.default.returnSuccess(httpStatus.CREATED, "User created");
            }
            catch (e) {
                console.log(e);
                return responseHandler_1.default.returnError(httpStatus.BAD_GATEWAY, constant_1.responseMessageConstant.HTTP_502_BAD_GATEWAY);
            }
        });
    }
    validateOTP(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSnapshot = yield this.userCollection
                .where("email", "==", body.email)
                .get();
            if (userSnapshot.empty) {
                return responseHandler_1.default.returnError(httpStatus.BAD_REQUEST, "user not found");
            }
            if (!(yield this.otpService.verifyOTP(body.email, body.otp))) {
                return responseHandler_1.default.returnError(httpStatus.BAD_REQUEST, "Wrong OTP");
            }
            const userDoc = userSnapshot.docs[0];
            const userRef = userDoc.ref;
            if (!userDoc.data().is_verified) {
                yield userRef.update({
                    is_verified: true,
                });
            }
            return responseHandler_1.default.returnSuccess(httpStatus.OK, "User verified");
        });
    }
}
exports.default = AuthSercie;
//# sourceMappingURL=AuthService.js.map