import ProductService from "../services/ProductService";
import { Request, Response } from "express";

export default class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProduct = async (req: Request, res: Response) => {
    try {
      const auth = await this.productService.getProducts(req.query);
      const { message, data } = auth.response;
      const code = auth.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      return res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };

  getProductById = async (req: Request, res: Response) => {
    try {
      const auth = await this.productService.getProducts(req.params.id);
      const { message, data } = auth.response;
      const code = auth.statusCode;

      return res.status(code).send({ code, message, data });
    } catch (e) {
      return res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  };
}
