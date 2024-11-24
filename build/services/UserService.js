"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const responseHandler_1 = __importDefault(require("../utils/responseHandler"));
const storage_1 = require("@google-cloud/storage");
const util_1 = require("util");
const http_status_1 = __importDefault(require("http-status"));
class UserService {
    constructor() {
        this.getProfile = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const userRef = this.userCollection.doc(user_id);
            const userSnapshot = yield userRef.get();
            if (userSnapshot.empty) {
                return responseHandler_1.default.returnError(http_status_1.default.NOT_FOUND, "user not found");
            }
            return responseHandler_1.default.returnSuccess(http_status_1.default.OK, "user fetched successfully", userSnapshot.data());
        });
        this.updateProfile = (body, file, id) => __awaiter(this, void 0, void 0, function* () {
            console.log("Masuk update profile...");
            const userRef = this.userCollection.doc(id);
            const userSnapshot = yield userRef.get();
            if (userSnapshot.empty) {
                return responseHandler_1.default.returnError(http_status_1.default.NOT_FOUND, "user not found");
            }
            console.log("file: ", file);
            let fileUrl;
            if (file != null) {
                console.log("ada file");
                fileUrl = yield this.uploadFile(file, id);
                console.log("url file ", fileUrl);
            }
            yield userRef.update(Object.assign(Object.assign({}, body), { profileUrl: fileUrl }));
            const updatedSnapshot = yield userRef.get();
            const updatedData = updatedSnapshot.data();
            return responseHandler_1.default.returnSuccess(http_status_1.default.OK, "profile updated", updatedData);
        });
        this.userCollection = db_1.default.collection("users");
        const storage = new storage_1.Storage({
            projectId: "copycatcapstone",
            keyFilename: "service_account.json",
        });
        this.bucket = storage.bucket("capstone-koong-test-bucket");
        console.log("user service created...");
    }
    uploadFile(file, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blob = this.bucket.file(file.originalname);
            blob.name = `${id}-profile.${file.mimetype.split("/")[1]}`;
            const blobStream = blob.createWriteStream({
                resumable: false,
            });
            const publicURL = yield new Promise((resolve, reject) => {
                blobStream.on("error", (e) => {
                    responseHandler_1.default.returnError(http_status_1.default.BAD_GATEWAY, e);
                });
                blobStream.on("finish", (data) => __awaiter(this, void 0, void 0, function* () {
                    const publicUrl = (0, util_1.format)(`https://storage.googleapis.com/${this.bucket.name}/${blob.name}`);
                    resolve(publicUrl);
                }));
                blobStream.end(file.buffer);
            });
            return publicURL;
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map