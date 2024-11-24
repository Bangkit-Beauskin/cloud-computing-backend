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
exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const _1 = __importDefault(require("."));
const db_1 = __importDefault(require("../db"));
const RedisConfig_1 = require("./RedisConfig");
const jwtOptions = {
    secretOrKey: _1.default.jwt.secret,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
};
const jwtVerify = (req, payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Masuk verify token");
        if (payload.type !== "ACCESS" && !req.url.includes("refresh-token")) {
            throw new Error("Invalid token type");
        }
        const auth = req.headers.authorization !== undefined
            ? req.headers.authorization.split(" ")
            : [];
        if (auth[1] === undefined) {
            return done(null, false);
        }
        const userCollection = db_1.default.collection("users");
        const userRef = userCollection.doc(payload.id);
        const userSnapshot = yield userRef.get();
        const tokenExist = RedisConfig_1.redisClient.get("tokens:" + payload.id);
        if (tokenExist == null) {
            return done(null, false);
        }
        const user = yield userSnapshot.data();
        return done(null, Object.assign({ id: payload.id }, user));
    }
    catch (e) {
        return done(e, false);
    }
});
const jwtStrategy = new passport_jwt_1.Strategy(jwtOptions, jwtVerify);
exports.jwtStrategy = jwtStrategy;
//# sourceMappingURL=passport.js.map