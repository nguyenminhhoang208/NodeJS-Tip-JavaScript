import { NextFunction, Request, Response } from 'express';
const AccessServices = require('../services/access.services');

class AccessController {
	signUp = async (req: Request, res: Response, next: NextFunction) => {
		try {
			console.log('[P]::signUp::', req.body);

			// 200: ok
			// 201: created

			return res.status(201).json(await AccessServices.signUp(req.body));
		} catch (error) {
			next(error);
		}
	};
}

module.exports = new AccessController();
