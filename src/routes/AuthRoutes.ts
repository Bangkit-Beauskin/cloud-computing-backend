import { Router } from "express";
import AuthController from "../controller/AuthController";

const authController = new AuthController();
const router = Router();
router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOTP);
export default router;
