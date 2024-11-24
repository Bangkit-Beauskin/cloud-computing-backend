import { Router } from "express";
import AuthController from "../controller/AuthController";
import { auth } from "../middleware/auth";

const authController = new AuthController();
const router = Router();
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh-token", auth(), authController.refreshToken);
router.post("/verify-otp", auth(), authController.verifyOTP);
export default router;
