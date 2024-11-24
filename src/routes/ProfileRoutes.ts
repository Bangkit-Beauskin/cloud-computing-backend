import { Router } from "express";
import ProfileController from "../controller/ProfileController";
import upload from "../middleware/upload";
import { auth } from "../middleware/auth";

const profileController = new ProfileController();
const router = Router();
router.get("/", auth(), profileController.getProfile);
router.post("/", auth(), upload, profileController.updateUser);
export default router;
