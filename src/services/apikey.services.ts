const ApiKeyModel = require('../models/apikey.model');
// const crypto = require('crypto');
const findApiKey = async (key: string) => {
	// await ApiKeyModel.create({
	// 	key: crypto.randomBytes(64).toString('hex'),
	// 	permissions: ['0000'],
	// });
	const objkey = await ApiKeyModel.findOne({
		key,
		status: true,
	}).lean();
	return objkey;
};

module.exports = { findApiKey };
