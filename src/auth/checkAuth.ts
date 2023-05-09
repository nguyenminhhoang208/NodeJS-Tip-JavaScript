import { NextFunction, Request, Response } from 'express';
const { findApiKey } = require('../services/apikey.services');

const HEADER = {
	API_KEY: 'x-api-key',
	AUTHORIZATION: 'authorization',
};

const checkApiKey = async (req: any, res: Response, next: NextFunction) => {
	try {
		// check header
		const key = req.headers[HEADER.API_KEY]?.toString();
		if (!key) {
			return res.status(403).json({
				message: 'Forbidden Error',
			});
		}

		// check objkey
		const objKey = await findApiKey(key);
		if (!objKey) {
			return res.status(403).json({
				message: 'Forbidden Error',
			});
		}
		req.objKey = objKey;
		return next();
	} catch (error) {
		res.status(401).json(error);
	}
};

const checkPermissios = (permissions: string[] | string): object => {
	return (req: any, res: Response, next: NextFunction) => {
		if (!req.objKey.permissions) {
			return res.status(403).json({
				message: 'Permissions Error',
			});
		}
		const verifyPermissions = req.objKey.permissions.includes(permissions);
		// console.log('>>> CHECK PERISSIONS::: ', verifyPermissions);
		if (!verifyPermissions) {
			return res.status(403).json({
				message: 'Permissions Error',
			});
		}
		return next();
	};
};
const asyncHandler = (fn: Function): object => {
	return (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};
};

module.exports = {
	checkApiKey,
	checkPermissios,
	asyncHandler,
};
