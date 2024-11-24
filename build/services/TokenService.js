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
const config_1 = __importDefault(require("../config"));
const constant_1 = require("../config/constant");
const RedisConfig_1 = require("../config/RedisConfig");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenService {
    constructor() {
        this.verifyToken = (token) => __awaiter(this, void 0, void 0, function* () {
            const db_token = RedisConfig_1.redisClient.get("tokens:" + token);
            if (db_token == null) {
                throw new Error(constant_1.responseMessageConstant.TOKEN_404_NOT_FOUND);
            }
            const payload = yield jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret, (err, decoded) => {
                if (err) {
                    throw new Error(constant_1.responseMessageConstant.TOKEN_404_NOT_FOUND);
                }
                else {
                    return decoded;
                }
            });
            return payload;
        });
    }
    generateAccessToken(id) {
        const iat = Date.now();
        const token = jsonwebtoken_1.default.sign({
            sub: id,
            type: "ACCESS",
            iat: iat,
        }, config_1.default.jwt.secret, {
            // 60000 is 1 minute
            expiresIn: Number(config_1.default.jwt.accessExpirationMinutes) * 60000,
        });
        RedisConfig_1.redisClient.setex("tokens:" + id, config_1.default.jwt.accessExpirationMinutes * 60 * 1000, token);
        return token;
    }
    generateRefreshToken(id) {
        const iat = Date.now();
        const token = jsonwebtoken_1.default.sign({
            sub: id,
            type: "REFRESH",
            iat: iat,
        }, config_1.default.jwt.secret, {
            expiresIn: Number(config_1.default.jwt.refreshExpirationDays * 24) * 3600000,
        });
        RedisConfig_1.redisClient.setex("tokens:" + id, config_1.default.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000, token);
        return token;
    }
}
exports.default = TokenService;
//# sourceMappingURL=TokenService.js.map