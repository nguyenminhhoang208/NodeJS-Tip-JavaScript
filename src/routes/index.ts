import { Express } from 'express';
const homeRoute = require('./home.route');
const accessRoute = require('./access');

const routes = (app: Express): void => {
	app.use('/v1/shop/', accessRoute);
	app.use('/', homeRoute);

	// handle error
	/**
	 * Middleware function đầu tiên được sử dụng để xử lý lỗi 404 (không tìm thấy trang).
	 * Nếu một yêu cầu không khớp với bất kỳ đường dẫn nào đã được đăng ký trước đó,
	 * middleware function này sẽ được gọi và trả về một thông báo lỗi.
	 */
	app.use((req, res, next) => {
		const error: any = new Error('Not Found!');
		error.status = 404;
		next(error);
	});

	/** Middleware function thứ hai được sử dụng để xử lý các lỗi khác.
	 * Nếu có bất kỳ lỗi nào xảy ra trong quá trình xử lý yêu cầu ở bất kì đâu trong
	 * trong trang web, middleware function này sẽ được gọi và trả về một thông báo lỗi. */

	app.use((err: any, req: any, res: any, next: any) => {
		const statusCode = err.status || 500; // 500 là lỗi chung của server
		return res.status(statusCode).json({
			code: statusCode,
			status: 'error',
			message: err.message || 'Internal server error!!',
		});
	});
};

module.exports = routes;
