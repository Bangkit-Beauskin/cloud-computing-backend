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
const AuthService_1 = __importDefault(require("../services/AuthService"));
<<<<<<< HEAD
const http_status_1 = __importDefault(require("http-status")); // Make sure http-status is installed
=======
const http_status_1 = __importDefault(require("http-status"));
>>>>>>> staging
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const auth = yield this.authService.login(req.body);
                const { message, data } = auth.response;
                const code = auth.statusCode;
                return res.status(code).send({ code, message, data });
            }
            catch (e) {
                return res.status(http_status_1.default.BAD_GATEWAY).send(e);
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
<<<<<<< HEAD
=======
                console.log(req.body);
>>>>>>> staging
                const auth = yield this.authService.register(req.body);
                const { message, data } = auth.response;
                const code = auth.statusCode;
                return res.status(code).send({ code, message, data });
            }
            catch (e) {
                return res.status(http_status_1.default.BAD_GATEWAY).send(e);
            }
        });
        this.verifyOTP = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
<<<<<<< HEAD
                const auth = yield this.authService.validateOTP(req.body);
=======
                const auth = yield this.authService.validateOTP(req.body, req.userInfo.id);
>>>>>>> staging
                const { message, data } = auth.response;
                const code = auth.statusCode;
                return res.status(code).send({ code, message, data });
            }
            catch (e) {
                return res.status(http_status_1.default.BAD_GATEWAY).send(e);
            }
        });
        this.authService = new AuthService_1.default();
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map