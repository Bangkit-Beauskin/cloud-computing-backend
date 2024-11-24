import config from "../config";
import { responseMessageConstant } from "../config/constant";
import { redisClient } from "../config/RedisConfig";
import jwt from "jsonwebtoken";

export default class TokenService {
  generateAccessToken(id) {
    const iat = Date.now();
    const token = jwt.sign(
      {
        sub: id,
        type: "ACCESS",
        iat: iat,
      },
      config.jwt.secret,
      {
        // 60000 is 1 minute
        expiresIn: Number(config.jwt.accessExpirationMinutes) * 60000,
      },
    );

    redisClient.setex(
<<<<<<< HEAD
      "tokens:" + token,
      config.jwt.accessExpirationMinutes * 60 * 1000,
=======
      "tokens:" + id,
      config.jwt.accessExpirationMinutes * 60 * 1000,
      token,
>>>>>>> staging
    );
    return token;
  }

  generateRefreshToken(id) {
    const iat = Date.now();
    const token = jwt.sign(
      {
        sub: id,
        type: "REFRESH",
        iat: iat,
      },
      config.jwt.secret,
      {
        expiresIn: Number(config.jwt.refreshExpirationDays * 24) * 3600000,
      },
    );

    redisClient.setex(
<<<<<<< HEAD
      "tokens:" + token,
      config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000,
=======
      "token-refresh:" + id,
      config.jwt.refreshExpirationDays * 24 * 60 * 60 * 1000,
      token,
>>>>>>> staging
    );
    return token;
  }

  verifyToken = async (token) => {
    const db_token = redisClient.get("tokens:" + token);
    if (db_token == null) {
      throw new Error(responseMessageConstant.TOKEN_404_NOT_FOUND);
    }

    const payload: any = await jwt.verify(
      token,
      config.jwt.secret,
      (err, decoded) => {
        if (err) {
          throw new Error(responseMessageConstant.TOKEN_404_NOT_FOUND);
        } else {
          return decoded;
        }
      },
    );

    return payload;
  };
}
