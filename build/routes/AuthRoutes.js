"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controller/AuthController"));
<<<<<<< HEAD
=======
const auth_1 = require("../middleware/auth");
>>>>>>> staging
const authController = new AuthController_1.default();
const router = (0, express_1.Router)();
router.post("/login", authController.login);
router.post("/register", authController.register);
<<<<<<< HEAD
router.post("/verify-otp", authController.verifyOTP);
=======
router.post("/verify-otp", auth_1.auth, authController.verifyOTP);
>>>>>>> staging
exports.default = router;
//# sourceMappingURL=AuthRoutes.js.map