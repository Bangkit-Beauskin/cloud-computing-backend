"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
let processFile = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
}).single("file");
const processFileMiddleware = (req, res, next) => {
    processFile(req, res, (err) => {
        if (err) {
            // If there's an error (e.g., file too large), return an error response
            return res.status(400).send(`Error processing file: ${err.message}`);
        }
        // If no errors, call next() to continue with the next middleware/handler
        next();
    });
};
exports.default = processFileMiddleware;
//# sourceMappingURL=upload.js.map