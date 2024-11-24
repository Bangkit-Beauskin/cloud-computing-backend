import db from "../db";
import * as bcrypt from "bcrypt";
import responseHandler from "../utils/responseHandler";
import { responseMessageConstant } from "../config/constant";
import OTPService from "./OTPService";
<<<<<<< HEAD
import AuthService from "./interface/AuthService";
import httpStatus from "http-status";

export default class AuthSercie implements AuthService {
  private userCollection;
  private otpService: OTPService;
=======
import IAuthService from "./interface/AuthService";
import httpStatus from "http-status";
import TokenService from "./TokenService";

export default class AuthService implements IAuthService {
  private userCollection;
  private otpService: OTPService;
  private tokenService: TokenService;
>>>>>>> staging

  constructor() {
    this.userCollection = db.collection("users");
    this.otpService = new OTPService();
<<<<<<< HEAD
=======
    this.tokenService = new TokenService();
>>>>>>> staging
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

<<<<<<< HEAD
      this.otpService.sendOTP(body.email);

      return responseHandler.returnSuccess(httpStatus.OK, "User fetched");
=======
      this.otpService.sendOTP(body.email, userSnapshot.docs[0].id);
      const accessToken = this.tokenService.generateAccessToken(
        userSnapshot.docs[0].id,
      );

      return responseHandler.returnSuccess(httpStatus.OK, "User fetched", {
        token: {
          access: accessToken,
        },
      });
>>>>>>> staging
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
<<<<<<< HEAD
      console.log("body", body);
      this.userCollection.add({
=======
      const userSnapshot = await this.userCollection
        .where("email", "==", body.email)
        .get();

      if (!userSnapshot.empty) {
        return responseHandler.returnError(
          httpStatus.NOT_FOUND,
          "Email is used",
        );
      }

      const userRef = this.userCollection.add({
>>>>>>> staging
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        is_verified: false,
      });

<<<<<<< HEAD
      this.otpService.sendOTP(body.email);
      return responseHandler.returnSuccess(httpStatus.CREATED, "User created");
=======
      const accessToken = this.tokenService.generateAccessToken(userRef.id);

      await this.otpService.sendOTP(body.email, userRef.id);
      return responseHandler.returnSuccess(httpStatus.CREATED, "User created", {
        token: {
          access: accessToken,
        },
      });
>>>>>>> staging
    } catch (e) {
      console.log(e);
      return responseHandler.returnError(
        httpStatus.BAD_GATEWAY,
        responseMessageConstant.HTTP_502_BAD_GATEWAY,
      );
    }
  }

<<<<<<< HEAD
  public async validateOTP(body) {
    const userSnapshot = await this.userCollection
      .where("email", "==", body.email)
      .get();

    if (userSnapshot.empty) {
=======
  public async validateOTP(body, user_id) {
    console.log("Masuk controller ");
    const userDoc = await this.userCollection.doc(user_id).get();

    if (userDoc.empty) {
>>>>>>> staging
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "user not found",
      );
    }

<<<<<<< HEAD
    if (!(await this.otpService.verifyOTP(body.email, body.otp))) {
      return responseHandler.returnError(httpStatus.BAD_REQUEST, "Wrong OTP");
    }
    const userDoc = userSnapshot.docs[0];
=======
    if (!(await this.otpService.verifyOTP(user_id, body.otp))) {
      return responseHandler.returnError(httpStatus.BAD_REQUEST, "Wrong OTP");
    }

>>>>>>> staging
    const userRef = userDoc.ref;

    if (!userDoc.data().is_verified) {
      await userRef.update({
        is_verified: true,
      });
    }

<<<<<<< HEAD
    return responseHandler.returnSuccess(httpStatus.OK, "User verified");
=======
    const accessToken = this.tokenService.generateAccessToken(userRef.id);
    const refreshToken = this.tokenService.generateRefreshToken(userRef.id);

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

    const accessToken = this.tokenService.generateAccessToken(userRef.id);
    const refreshToken = this.tokenService.generateRefreshToken(userRef.id);

    return responseHandler.returnSuccess(httpStatus.OK, "User verified", {
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
>>>>>>> staging
  }
}
