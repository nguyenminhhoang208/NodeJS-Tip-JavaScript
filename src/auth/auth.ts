const JWT = require('jsonwebtoken');
const createTokesPair = async (
	payload: any,
	privateKey: string,
	publicKey: object
): Promise<object> => {
	try {
		const accessToken = await JWT.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '2 days',
		});

		const refreshToken = await JWT.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '7 days',
		});

		JWT.verify(accessToken, publicKey, (err: any, decode: any) => {
			if (err) {
				console.error('>>> error verify:: ', err);
			} else {
				console.log('>>> decode verify:: ', decode);
			}
		});

		return { accessToken, refreshToken };
	} catch (error: any) {
		return {
			code: 'xxxx',
			message: error.message,
		};
	}
};
export {};
module.exports = {
	createTokesPair,
};
