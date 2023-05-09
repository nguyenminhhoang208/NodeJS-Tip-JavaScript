const KeyTokenModel = require('../models/keytoken.model');

class KeyTokenService {
	static createKeyToken = async ({
		userId,
		publicKey,
		privateKey,
		refreshToken,
	}: {
		userId: any;
		publicKey: any;
		privateKey: any;
		refreshToken?: string;
	}) => {
		/** LEVEL 0:
		 * 	try {
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
		 */

		// LEVEL xxx
		const filter = { user: userId };
		const update = {
			publicKey,
			privateKey,
			refreshTokenUsed: [],
			refreshToken,
		};
		const options = {
			upsert: true,
			new: true, // trả về data sau khi update, mặc định trả về data trước khi update
		};
		const tokens = await KeyTokenModel.findOneAndUpdate(
			filter,
			update,
			options
		);
		return tokens ? tokens.publicKey : null;
	};
}

export {};
module.exports = KeyTokenService;
