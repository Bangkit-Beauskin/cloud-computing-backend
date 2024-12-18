import db from "../db";
import * as bcrypt from "bcrypt";
import responseHandler from "../utils/responseHandler";
import { responseMessageConstant } from "../config/constant";
import OTPService from "./OTPService";
import IAuthService from "./interface/AuthService";
import httpStatus from "http-status";
import TokenService from "./TokenService";

export default class AuthService implements IAuthService {
  private userCollection;
  private otpService: OTPService;
  private tokenService: TokenService;

  constructor() {
    this.userCollection = db.collection("users");
    this.otpService = new OTPService();
    this.tokenService = new TokenService();
  }

  public async login(body) {
    try {
      const userSnapshot = await this.userCollection
        .where("email", "==", body.email)
        .get();

      if (userSnapshot.empty) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          responseMessageConstant.USER_404_NOT_FOUND,
        );
      }

      const user = userSnapshot.docs[0].data();

      const isPasswordValid = await bcrypt.compare(
        body.password,
        user.password,
      );

      if (!isPasswordValid) {
        return responseHandler.returnError(
          httpStatus.BAD_REQUEST,
          "Wrong password",
        );
      }

      this.otpService.sendOTP(body.email, userSnapshot.docs[0].id);
      const accessToken = await this.tokenService.generateAccessToken(
        userSnapshot.docs[0].id,
      );

      return responseHandler.returnSuccess(httpStatus.OK, "User fetched", {
        token: {
          access: accessToken,
        },
      });
    } catch (e) {
      console.log(e);
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Wrong password",
      );
    }
  }

  public async register(body) {
    try {
      const userSnapshot = await this.userCollection
        .where("email", "==", body.email)
        .get();

      if (!userSnapshot.empty) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          "Email is used",
        );
      }

      const userRef = await this.userCollection.add({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        is_verified: false,
      });

      const accessToken = await this.tokenService.generateAccessToken(
        userRef.id,
        5,
      );

      console.log("user id" + userRef.id);
      await this.otpService.sendOTP(body.email, userRef.id);
      return responseHandler.returnSuccess(httpStatus.CREATED, "User created", {
        token: {
          access: accessToken,
        },
      });
    } catch (e) {
      console.log(e);
      return responseHandler.returnError(
        httpStatus.BAD_GATEWAY,
        responseMessageConstant.HTTP_502_BAD_GATEWAY,
      );
    }
  }

  public async validateOTP(body, user_id) {
    const userDoc = await this.userCollection.doc(user_id).get();
    console.log("Masuk controller user" + userDoc);
    if (userDoc.empty) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "user not found",
      );
    }

    if (!(await this.otpService.verifyOTP(userDoc.id, body.otp))) {
      return responseHandler.returnError(httpStatus.BAD_REQUEST, "Wrong OTP");
    }

    const userRef = userDoc.ref;

    if (!userDoc.data().is_verified) {
      await userRef.update({
        is_verified: true,
      });
    }

    const accessToken = await this.tokenService.generateAccessToken(userRef.id);
    const refreshToken = await this.tokenService.generateRefreshToken(
      userRef.id,
    );

    return responseHandler.returnSuccess(httpStatus.OK, "User verified", {
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  }

  public async refreshToken(user_id) {
    const userDoc = await this.userCollection.doc(user_id).get();
    const userRef = userDoc.ref;

    console.log("user id ", userRef.id);

    const accessToken = await this.tokenService.generateAccessToken(userRef.id);
    const refreshToken = await this.tokenService.generateRefreshToken(
      userRef.id,
    );

    return responseHandler.returnSuccess(httpStatus.OK, "User verified", {
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  }
}
