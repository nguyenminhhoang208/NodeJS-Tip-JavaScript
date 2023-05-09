import { NextFunction, Request, Response } from 'express';
const AccessServices = require('../services/access.services');
const { CREATED, OK } = require('../core/success.response');

class AccessController {
	login = async (req: Request, res: Response, next: NextFunction) => {
		console.log('>>> CHECK REQ.BODY LOGIN:: ', req.body);

		new OK({
			message: 'OK successfully!!',
			metadata: await AccessServices.login(req.body),
		}).send(res);
	};
	signUp = async (req: Request, res: Response, next: NextFunction) => {
		// try {
		// 	console.log('[P]::signUp::', req.body);

		// 200: ok
		// 201: created

		new CREATED({
			message: 'Created successfully!!',
			metadata: await AccessServices.signUp(req.body),
			options: {
				limit: 10,
			},
		}).send(res);
		// return res.status(201).json(await AccessServices.signUp(req.body));
		// } catch (error) {
		// 	next(error);
		// }
	};
}

module.exports = new AccessController();
