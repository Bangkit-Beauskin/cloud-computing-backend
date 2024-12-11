import { stringify } from "querystring";
import db from "../db";
import responseHandler from "../utils/responseHandler";
import httpStatus from "http-status";

export default class ProductService {
  private productCollection;

  constructor() {
    this.productCollection = db.collection("products");
  }

  getProductById = async (id) => {
    const snapshot = await this.productCollection.doc(id).get();

    if (snapshot.empty) {
      return responseHandler.returnError(
        httpStatus.NOT_FOUND,
        "Product not found",
      );
    }

    return responseHandler.returnSuccess(
      httpStatus.OK,
      "Product successfully",
      {
        id: snapshot.id,
        ...snapshot.data(),
      },
    );
  };

  getProducts = async (query) => {
    const { page = 1, row = 10, skin_type = "" } = query;
    const offset = (page - 1) * row;

    try {
      let query = this.productCollection;

      console.log(page, row, skin_type);
      if (skin_type != "" && skin_type != null) {
        console.log("Masuk filter");
        query = query.where("skin_type", "==", skin_type);
      }

      const snapshot = await query.offset(offset).limit(Number(row)).get();

      const data = await snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return responseHandler.returnSuccess(
        httpStatus.OK,
        "Fetch product successfully",
        data,
      );
    } catch (e) {
      console.error("Error fetching paginated data:", e);
      return responseHandler.returnError(httpStatus.BAD_GATEWAY, "BAD_GATEWAY");
    }
  };
}
