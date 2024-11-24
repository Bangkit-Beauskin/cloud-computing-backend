import { Router } from "express";
import AuthController from "../controller/AuthController";
<<<<<<< HEAD
=======
import { auth } from "../middleware/auth";
>>>>>>> staging

const authController = new AuthController();
const router = Router();
router.post("/login", authController.login);
router.post("/register", authController.register);
<<<<<<< HEAD
router.post("/verify-otp", authController.verifyOTP);
=======
router.post("/refresh-token", auth(), authController.refreshToken);
router.post("/verify-otp", auth(), authController.verifyOTP);
>>>>>>> staging
export default router;
