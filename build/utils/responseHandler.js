"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logError = (err) => {
    console.error(err);
};
const logErrorMiddleware = (err, req, res, next) => {
    logError(err);
    next(err);
};
const returnError = (statusCode, message) => {
    const response = {
        statusCode,
        response: {
            code: statusCode,
            message,
        },
    };
    return response;
};
const returnSuccess = (statusCode, message, data) => {
    const response = {
        statusCode,
        response: {
            code: statusCode,
            message,
            data,
        },
    };
    return response;
};
const getPaginationData = (rows, page = 1, limit = 10) => {
    const { count: totalItems, rows: data } = rows;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    const response = {
        totalItems,
        data,
        totalPages,
        currentPage,
    };
    return response;
};
exports.default = {
    logError,
    logErrorMiddleware,
    returnError,
    returnSuccess,
    getPaginationData,
};
//# sourceMappingURL=responseHandler.js.map