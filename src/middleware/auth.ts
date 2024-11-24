import passport from "passport";
import httpStatus from "http-status";
import { responseMessageConstant } from "../config/constant";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";

const verifyCallback =
  (req: any, res: Response, resolve: any, reject: any) =>
  // eslint-disable-next-line consistent-return
  async (err: any, user: any, info: any) => {
    if (err || info || !user) {
      return reject(
        new ApiError(
          httpStatus.UNAUTHORIZED,
          responseMessageConstant.HTTP_401_UNAUTHORIZED,
        ),
      );
    }

    req.userInfo = user;
    resolve();
  };

export const auth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    new Promise((resolve, reject) => {
      console.log("masuk ke auth");
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, res, resolve, reject),
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => {
        next(err);
      });
  };
