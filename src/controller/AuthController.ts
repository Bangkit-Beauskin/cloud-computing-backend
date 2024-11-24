import { Request, Response } from "express";
import AuthService from "../services/AuthService";
<<<<<<< HEAD
import httpStatus from "http-status"; // Make sure http-status is installed
=======
import httpStatus from "http-status";
import { redisClient } from "../config/RedisConfig";
>>>>>>> staging

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  login = async (req: Request, res: Response) => {
    try {
      const auth = await this.authService.login(req.body);
      const { message, data } = auth.response;
      const code = auth.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      return res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const auth = await this.authService.register(req.body);
      const { message, data } = auth.response;
      const code = auth.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      return res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

<<<<<<< HEAD
  verifyOTP = async (req: Request, res: Response) => {
    try {
      const auth = await this.authService.validateOTP(req.body);
=======
  verifyOTP = async (req: any, res: Response) => {
    try {
      const auth = await this.authService.validateOTP(
        req.body,
        req.userInfo.id,
      );
>>>>>>> staging
      const { message, data } = auth.response;
      const code = auth.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
<<<<<<< HEAD
=======
      console.log(e);
      return res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  refreshToken = async (req, res) => {
    try {
      console.log("masuk ke controller");
      const auth = await this.authService.refreshToken(req.userInfo.id);
      const { message, data } = auth.response;
      const code = auth.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      console.log(e);
>>>>>>> staging
      return res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}

export default AuthController;
