import { type } from 'os';

const crypto = require('crypto');
const { createTokesPair } = require('../auth/auth');
const KeyTokenService = require('../services/keytoken.services');
const {
	BadRequestError,
	ConflictRequestError,
} = require('../core/error.response');

type Tshop = {
	_id: any;
	email: any;
	roles: string[];
};
type Ttokens = {
	accessToken: string;
	refreshToken: string;
};

const createToken = async (
	shop: Tshop,
	refreshToken?: string
): Promise<Ttokens> => {
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
	const publicKeyString = await KeyTokenService.createKeyToken({
		userId: shop._id,
		publicKey,
		privateKey,
		refreshToken,
	});

	if (!publicKeyString) {
		throw new BadRequestError('Create Key Failed!!');
	}

	const publicKeyObject = await crypto.createPublicKey(publicKeyString);

	// create tokens
	const tokens: Ttokens = await createTokesPair(
		{
			userId: shop._id,
			email: shop.email,
			roles: [...shop.roles],
		},
		privateKey,
		publicKeyObject
	);
	// console.log('>>> TOKEN ::: ', tokens);

	return tokens;
};

module.exports = createToken;
