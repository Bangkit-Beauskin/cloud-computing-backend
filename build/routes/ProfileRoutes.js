"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProfileController_1 = __importDefault(require("../controller/ProfileController"));
const upload_1 = __importDefault(require("../middleware/upload"));
const auth_1 = require("../middleware/auth");
const profileController = new ProfileController_1.default();
const router = (0, express_1.Router)();
router.get("/", auth_1.auth, profileController.getProfile);
router.post("/:id", auth_1.auth, upload_1.default, profileController.updateUser);
exports.default = router;
//# sourceMappingURL=ProfileRoutes.js.map