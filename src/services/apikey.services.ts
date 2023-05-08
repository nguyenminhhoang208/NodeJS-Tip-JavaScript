const ApiKeyModel = require('../models/apikey.model');

const findApiKey = async (key: string) => {
	const objkey = await ApiKeyModel.findOne({
		key,
		status: true,
	}).lean();
	return objkey;
};

module.exports = { findApiKey };
