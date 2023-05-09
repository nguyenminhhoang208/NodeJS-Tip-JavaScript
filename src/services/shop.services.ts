import {} from 'os';

const shopModel = require('../models/shop.model');
const {
	BadRequestError,
	ConflictRequestError,
} = require('../core/error.response');
const findShopWithEmail = async (email: string) => {
	const shop = await shopModel
		.findOne({
			email,
		})
		.lean();

	if (!shop) {
		throw new BadRequestError("Email hasn't existed!!");
	}
	return shop;
};

module.exports = {
	findShopWithEmail,
};
