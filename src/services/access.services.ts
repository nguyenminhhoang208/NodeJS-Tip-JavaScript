import { type } from 'os';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const getInfoData = require('../utils/getInfoData.until');
const createToken = require('../utils/createToken');
const { findShopWithEmail } = require('./shop.services');
const {
	BadRequestError,
	ConflictRequestError,
} = require('../core/error.response');

enum RoleShop {
	SHOP = 'SHOP',
	WRITER = 'WRITER',
	ADMIN = 'ADMIN',
}

class AccessServices {
	static login = async (data: { email: string; password: string }) => {
		console.log('>>> CHECK DATA LOGIN:: ', data);

		// find in dbs
		const shop = await findShopWithEmail(data.email);
		if (!shop) {
			throw new BadRequestError('Email does not exist!!');
		}
		// verify pw
		const comparePW = await bcrypt.compare(data.password, shop.password);
		if (!comparePW) {
			throw new BadRequestError('Password not valid!!');
		}
		const tokens = await createToken(shop);
		if (!tokens) {
			throw new BadRequestError('Create tokens failed!!');
		}
		return {
			shop: getInfoData({
				fileds: ['_id', 'name', 'roles'],
				object: shop,
			}),
			tokens,
		};
	};

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
		const pwHash = await bcrypt.hash(password, 10);

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

		const tokens = await createToken(newShop);

		// console.log('>>> Create token successfully:: ', tokens);
		// const { accessToken, refreshToken } = tokens;

		// console.log('\n>>> ACCESS TOKEN:: ', accessToken);
		// console.log('\n>>> REFRESH TOKEN:: ', refreshToken);

		return {
			shop: getInfoData({
				fileds: ['_id', 'name', 'roles'],
				object: newShop,
			}),
			tokens,
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
