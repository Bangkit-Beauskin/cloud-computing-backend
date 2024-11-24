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
const UserService_1 = __importDefault(require("../services/UserService"));
class UserController {
    constructor() {
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.getProfile(req.userInfo);
                const { message, data } = user.response;
                const code = user.statusCode;
                return res.status(code).send({ code, message, data });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.updateProfile(req.body, req.file, req.params.id);
                const { message, data } = user.response;
                const code = user.statusCode;
                return res.status(code).send({ code, message, data });
            }
            catch (e) {
                console.log(e);
            }
        });
        this.userService = new UserService_1.default();
    }
}
exports.default = UserController;
//# sourceMappingURL=ProfileController.js.map