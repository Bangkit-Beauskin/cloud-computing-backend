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
exports.auth = void 0;
const passport_1 = __importDefault(require("passport"));
const http_status_1 = __importDefault(require("http-status"));
const constant_1 = require("../config/constant");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const verifyCallback = (req, res, resolve, reject) => 
// eslint-disable-next-line consistent-return
(err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (err || info || !user) {
        return reject(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, constant_1.responseMessageConstant.HTTP_401_UNAUTHORIZED));
    }
    req.userInfo = user;
    resolve();
});
const auth = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    new Promise((resolve, reject) => {
        passport_1.default.authenticate("jwt", { session: false }, verifyCallback(req, res, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => {
        next(err);
    });
});
exports.auth = auth;
//# sourceMappingURL=auth.js.map