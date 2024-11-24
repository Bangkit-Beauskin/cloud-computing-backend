import UserService from "../services/UserService";
import { Request, Response } from "express";

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getProfile = async (req: any, res: Response) => {
    try {
      const user = await this.userService.getProfile(req.userInfo.id);
      const { message, data } = user.response;
      const code = user.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      console.log(e);
    }
  };

  updateUser = async (req: any, res: Response) => {
    try {
      const user = await this.userService.updateProfile(
        req.body,
        req.file,
        req.userInfo.id,
      );
      const { message, data } = user.response;
      const code = user.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      console.log(e);
    }
  };
}
