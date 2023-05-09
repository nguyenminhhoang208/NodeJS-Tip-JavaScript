import { type } from 'os';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { createTokesPair } = require('../auth/auth');
const getInfoData = require('../utils/getInfoData.until');

const KeyTokenService = require('./keytoken.services');
const {
	BadRequestError,
	ConflictRequestError,
} = require('../core/error.response');

const RoleShop = {
	SHOP: 'SHOP',
	WRITER: 'WRITER',
	ADMIN: 'ADMIN',
};

class AccessServices {
	static signUp = async ({
		name,
		email,
		password,
	}: {
		name: string;
		email: string;
		password: string;
	}) => {
		// try {
		// phương thức lean() được sử dụng để trả về
		// một đối tượng JavaScript thuần túy thay vì
		// một đối tượng Mongoose1. Điều này giúp giảm
		//bớt độ trễ và tăng tốc độ xử lý dữ liệu.
		const holderShop = await shopModel.findOne({ email }).lean();
		if (holderShop) {
			throw new BadRequestError('Email already existed!!');
			// return {
			// 	code: 'xxxx',
			// 	message: 'Email already existed!!',
			// };
		}

		// hash pw
		const pwHash = bcrypt.hash(password, 10);

		// create shop
		const newShop: any = await shopModel.create({
			name,
			email,
			password: pwHash,
			roles: [RoleShop.SHOP],
		});

		if (!newShop) {
			throw new BadRequestError('Create Failed!!');
			// return {
			// 	code: 'xxxx',
			// 	message: 'Create Failed!!',
			// };
		}

		// create key
		const { privateKey, publicKey } = await crypto.generateKeyPairSync('rsa', {
			modulusLength: 4096,
			publicKeyEncoding: {
				type: 'spki',
				format: 'pem',
			},
			privateKeyEncoding: {
				type: 'pkcs8',
				format: 'pem',
			},
		});
		// console.log({ privateKey, publicKey });
		const publicKeyString = await KeyTokenService.createKeyToken({
			userId: newShop._id,
			publicKey,
		});

		if (!publicKeyString) {
			throw new BadRequestError('Create Key Failed!!');

			// return {
			// 	code: 'xxxx',
			// 	message: 'Create Key Failed!!',
			// };
		}

		const publicKeyObject = await crypto.createPublicKey(publicKeyString);

		type Ttokens = {
			accessToken: string;
			refreshToken: string;
		};
		// create tokens
		const tokens: Ttokens = await createTokesPair(
			{
				userId: newShop._id,
				email,
				roles: [...newShop.roles],
			},
			privateKey,
			publicKeyObject
		);
		// console.log('>>> Create token successfully:: ', tokens);
		// const { accessToken, refreshToken } = tokens;

		// console.log('\n>>> ACCESS TOKEN:: ', accessToken);
		// console.log('\n>>> REFRESH TOKEN:: ', refreshToken);

		return {
			code: 201,
			message: 'Create token successfully!!',
			metadata: {
				shop: getInfoData({
					fileds: ['_id', 'name', 'roles'],
					object: newShop,
				}),
				tokens,
			},
		};
		// } catch (error: any) {
		// 	return {
		// 		message: error.message,
		// 		code: 'xxxx',
		// 	};
		// }
	};
}
module.exports = AccessServices;
