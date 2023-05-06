"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const app = (0, express_1.default)();
// connect database
require('./dbs/init.mongodb');
// init middlewares
app.use(morgan('dev')); // log request
app.use(helmet()); // bảo vệ những thông tin riêng tư
app.use((0, compression_1.default)()); // giảm kích thước dữ liệu vận chuyển
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello World!!',
    });
});
module.exports = app;
