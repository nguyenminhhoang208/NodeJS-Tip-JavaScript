const _ = require('lodash');

const getInfoData = ({
	fileds = [],
	object = {},
}: {
	fileds: string[];
	object: object;
}): object => {
	return _.pick(object, fileds);
};

module.exports = getInfoData;
