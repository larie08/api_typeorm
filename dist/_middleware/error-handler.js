"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
            const is404 = err.toLowerCase().endsWith('not found');
            const statusCode = is404 ? 404 : 400;
            res.status(statusCode).json({ message: err });
            break;
        default:
            res.status(500).json({ message: err.message });
            break;
    }
    next(err);
}
