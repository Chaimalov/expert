"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.error(`error ${error.message}`);
    const status = error.status || 400;
    res.status(status).send(error.message);
};
exports.errorHandler = errorHandler;
class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
