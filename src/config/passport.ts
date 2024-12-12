import { ExtractJwt, Strategy } from "passport-jwt";
import config from ".";
import db from "../db";

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

    if (!userSnapshot.exists) {
      console.log("User not found");
      return done(null, false);
    }

    const tokenCollection = db.collection("tokens");
    const db_tokenSnapshot = await tokenCollection.doc(auth[1]).get();

    if (!db_tokenSnapshot.exists) {
      console.log("Token document not found in Firestore");
      return done(null, false);
    }

    const docData = db_tokenSnapshot.data();
    if (!docData) {
      console.log("Token document has no data");
      return done(null, false);
    }

    const now = new Date();
    const firestoreTime = docData.expired_at.toDate();

    if (firestoreTime < now) {
      return done(null, false);
    }

    const user = userSnapshot.data();
    if (!user) {
      console.log("User data not found");
      return done(null, false); // User not found
    }
    console.log("check point 3 ", user);
    return done(null, { id: payload.sub, ...user });
  } catch (e) {
    console.log(e);
    return done(e, false);
  }
};
const jwtStrategy = new Strategy(jwtOptions, jwtVerify);
export { jwtStrategy };
