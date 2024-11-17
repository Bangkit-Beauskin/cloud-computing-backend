import db from "../db";
import * as bcrypt from "bcrypt";
import responseHandler from "../utils/responseHandler";
import { responseMessageConstant } from "../config/constant";
import OTPService from "./OTPService";
import AuthService from "./interface/AuthService";
import httpStatus from "http-status";

export default class AuthSercie implements AuthService {
  private userCollection;
  private otpService: OTPService;

  constructor() {
    this.userCollection = db.collection("users");
    this.otpService = new OTPService();
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

      this.otpService.sendOTP(body.email);

      return responseHandler.returnSuccess(httpStatus.OK, "User fetched");
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
      console.log("body", body);
      this.userCollection.add({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        is_verified: false,
      });

      this.otpService.sendOTP(body.email);
      return responseHandler.returnSuccess(httpStatus.CREATED, "User created");
    } catch (e) {
      console.log(e);
      return responseHandler.returnError(
        httpStatus.BAD_GATEWAY,
        responseMessageConstant.HTTP_502_BAD_GATEWAY,
      );
    }
  }

  public async validateOTP(body) {
    const userSnapshot = await this.userCollection
      .where("email", "==", body.email)
      .get();

    if (userSnapshot.empty) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "user not found",
      );
    }

    if (!(await this.otpService.verifyOTP(body.email, body.otp))) {
      return responseHandler.returnError(httpStatus.BAD_REQUEST, "Wrong OTP");
    }
    const userDoc = userSnapshot.docs[0];
    const userRef = userDoc.ref;

    if (!userDoc.data().is_verified) {
      await userRef.update({
        is_verified: true,
      });
    }

    return responseHandler.returnSuccess(httpStatus.OK, "User verified");
  }
}
