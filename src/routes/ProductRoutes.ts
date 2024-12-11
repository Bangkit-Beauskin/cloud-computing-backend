import { Router } from "express";
import ProductController from "../controller/ProductController";
import upload from "../middleware/upload";
import { auth } from "../middleware/auth";

const productController = new ProductController();
const router = Router();
router.get("/", auth(), productController.getProduct);
router.get("/:id", auth(), upload, productController.getProductById);
export default router;
