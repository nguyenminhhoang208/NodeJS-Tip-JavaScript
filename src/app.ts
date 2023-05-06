import compression from 'compression';
import express, { Express, NextFunction, Request, Response } from 'express';
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const app: Express = express();

// connect database
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();
// init middlewares

app.use(morgan('dev')); // log request

app.use(helmet()); // bảo vệ những thông tin riêng tư

app.use(compression()); // giảm kích thước dữ liệu vận chuyển

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json({
		message: 'Hello World!!',
	});
});

module.exports = app;
