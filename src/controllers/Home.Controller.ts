import { NextFunction, Request, Response } from 'express';

class HomeController {
	getHome = async (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.status(200).json({
				message: 'Hello World!!',
			});
		} catch (error) {
			next(error);
		}
	};
}

module.exports = new HomeController();
