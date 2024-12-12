import config from "../config";
import { responseMessageConstant } from "../config/constant";
import jwt from "jsonwebtoken";
import db from "../db";

export default class TokenService {
  private tokenCollection;

  constructor() {
    this.tokenCollection = db.collection("tokens");
  }

  generateAccessToken = async (id, expirationMinutes = 0) => {
    console.log("expiration minutes " + expirationMinutes);
    if (expirationMinutes == null || expirationMinutes <= 0) {
      console.log("masuk data env");
      expirationMinutes = Number(config.jwt.accessExpirationMinutes) * 60000;
    } else {
      console.log("masuk data variable");
      expirationMinutes = Number(expirationMinutes) * 60000;
    }

    console.log("user id " + id);
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
        expiresIn: expirationMinutes,
      },
    );

    await this.tokenCollection.doc(token).set({
      user_id: id,
      type: "ACCESS",
      token: token,
      expired_at: new Date(Date.now() + expirationMinutes),
    });

    console.log("acc token " + token);

    return token;
  };

  generateRefreshToken = async (id) => {
    const iat = Date.now();
    const token = jwt.sign(
      {
        sub: id,
        type: "REFRESH",
        iat: iat,
      },
      config.jwt.secret,
      {
        expiresIn: Number(config.jwt.refreshExpirationDays * (24 * 3600000)),
      },
    );

    await this.tokenCollection.doc(token).set({
      user_id: id,
      type: "REFRESH",
      token: token,
      expired_at: new Date(
        Date.now() + Number(config.jwt.refreshExpirationDays * (24 * 3600000)),
      ),
    });

    return token;
  };

  async verifyToken(token) {
    const db_tokenSnapshot = await this.tokenCollection.doc(token).get();

    if (!db_tokenSnapshot.empty) {
      const docData = db_tokenSnapshot.data();
      const now = new Date();
      const firestoreTime = docData.expired_at.toDate();

      if (firestoreTime < now) {
        throw new Error("Unauthorize");
      }

      const payload = jwt.verify(token, config.jwt.secret);
      return payload;
    }

    throw new Error(responseMessageConstant.TOKEN_404_NOT_FOUND);
  }
}
