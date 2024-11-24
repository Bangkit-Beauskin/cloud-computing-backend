"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorConverter = exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("./ApiError"));
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res) => {
    let { statusCode, message } = err;
    if (config_1.default.nodeEnv === "production" && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = err.message;
    const response = Object.assign({ code: statusCode, message }, (config_1.default.nodeEnv === "development" && { stack: err.stack }));
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError_1.default)) {
        const statusCode = error.statusCode
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new ApiError_1.default(statusCode, message, false, err.stack);
    }
    (0, exports.errorHandler)(error, req, res);
    next(error);
};
exports.errorConverter = errorConverter;
//# sourceMappingURL=error.js.map