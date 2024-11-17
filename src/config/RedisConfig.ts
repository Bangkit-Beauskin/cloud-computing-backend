import config from ".";

const Redis = require("ioredis");

export const redisClient = new Redis({
  host: config.redis.host,
  port: config.redis.port,
});
