import { ExtractJwt, Strategy } from "passport-jwt";
import config from ".";
import db from "../db";
import { redisClient } from "./RedisConfig";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true,
};

const jwtVerify = async (req, payload, done) => {
  try {
    console.log("Masuk verify token");
    if (payload.type !== "ACCESS" && !req.url.includes("refresh-token")) {
      throw new Error("Invalid token type");
    }

    const auth =
      req.headers.authorization !== undefined
        ? req.headers.authorization.split(" ")
        : [];
    if (auth[1] === undefined) {
      return done(null, false);
    }

    console.log("check point 1", payload);

    const userCollection = db.collection("users");
    const userSnapshot = await userCollection.doc(payload.sub).get();
    const tokenExist = redisClient.get("tokens:" + payload.sub);

    console.log("check point 2");
    if (tokenExist == null) {
      return done(null, false);
    }

    const user = await userSnapshot.data();
    console.log("check point 3 ", user);
    return done(null, { id: payload.sub, ...user });
  } catch (e) {
    console.log(e);
    return done(e, false);
  }
};
const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
export { jwtStrategy };
