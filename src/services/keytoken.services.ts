const KeyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		publicKey,
	}: {
		userId: any;
		publicKey: any;
	}) => {
		try {
			const publicKeyString = publicKey.toString();

			const tokens = await KeyTokenModel.create({
				user: userId,
				publicKey: publicKeyString,
			});
			return tokens ? publicKeyString : null;
		} catch (error: any) {
			return {
				code: 'xxxx',
				message: error.message,
			};
		}
	};
}

export {};
module.exports = KeyTokenService;
