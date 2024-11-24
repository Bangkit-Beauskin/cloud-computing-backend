import { url } from "inspector";
import db from "../db";
import responseHandler from "../utils/responseHandler";
import { Storage } from "@google-cloud/storage";
import { format } from "util";
import IUserService from "./interface/UserService";
import httpStatus from "http-status";

export default class UserService implements IUserService {
  private userCollection;
  private bucket;

  constructor() {
    this.userCollection = db.collection("users");
    const storage = new Storage({
      projectId: "copycatcapstone",
      keyFilename: "service_account.json",
    });
    this.bucket = storage.bucket("capstone-koong-test-bucket");
    console.log("user service created...");
  }

  getProfile = async (user_id) => {
    const userRef = this.userCollection.doc(user_id);
    const userSnapshot = await userRef.get();
    if (userSnapshot.empty) {
      return responseHandler.returnError(
        httpStatus.NOT_FOUND,
        "user not found",
      );
    }

    return responseHandler.returnSuccess(
      httpStatus.OK,
      "user fetched successfully",
      userSnapshot.data(),
    );
  };

  updateProfile = async (body, file, id) => {
    console.log("Masuk update profile...");
    const userRef = this.userCollection.doc(id);
    const userSnapshot = await userRef.get();
    if (userSnapshot.empty) {
      return responseHandler.returnError(
        httpStatus.NOT_FOUND,
        "user not found",
      );
    }

    console.log("file: ", file);

    let fileUrl;
    if (file != null) {
      console.log("ada file");
      fileUrl = await this.uploadFile(file, id);
      console.log("url file ", fileUrl);
    }

    await userRef.update({ ...body, profileUrl: fileUrl });

    const updatedSnapshot = await userRef.get();
    const updatedData = updatedSnapshot.data();

    return responseHandler.returnSuccess(
      httpStatus.OK,
      "profile updated",
      updatedData,
    );
  };

  async uploadFile(file, id) {
    const blob = this.bucket.file(file.originalname);
    blob.name = `${id}-profile.${file.mimetype.split("/")[1]}`;
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    const publicURL = await new Promise((resolve, reject) => {
      blobStream.on("error", (e) => {
        responseHandler.returnError(httpStatus.BAD_GATEWAY, e);
      });

      blobStream.on("finish", async (data) => {
        const publicUrl = format(
          `https://storage.googleapis.com/${this.bucket.name}/${blob.name}`,
        );

        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });

    return publicURL;
  }
}
