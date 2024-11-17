"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const _1 = __importDefault(require("."));
const Redis = require("ioredis");
exports.redisClient = new Redis({
    host: _1.default.redis.host,
    port: _1.default.redis.port,
});
//# sourceMappingURL=RedisConfig.js.map