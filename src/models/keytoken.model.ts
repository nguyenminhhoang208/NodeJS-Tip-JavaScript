import { Schema } from 'mongoose';

const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME: string = 'keys';
const DOCUMENT_NAME: string = 'key';

// Declare the Schema of the Mongo model
var keytokenSchema = new mongoose.Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'shop',
		},
		publicKey: {
			type: String,
			required: true,
		},
		refreshTokenUsed: {
			type: Array,
			default: [],
		},
		refreshToken: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);
const KeyTokenModel = mongoose.model(DOCUMENT_NAME, keytokenSchema);

//Export the model
module.exports = KeyTokenModel;
