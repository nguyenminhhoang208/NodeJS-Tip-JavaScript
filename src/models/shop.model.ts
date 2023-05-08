import { Schema } from 'mongoose';

// !mdbgum
const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME: string = 'shops';
const DOCUMENT_NAME: string = 'shop';

// Declare the Schema of the Mongo model
var shopSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxLength: 150,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: Object,
			required: true,
		},
		status: {
			type: String,
			enum: ['active', 'inactive'],
			default: 'inactive',
		},
		verify: {
			type: Schema.Types.Boolean,
			default: false,
		},
		roles: {
			type: Array,
			default: [],
		},
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	}
);

const ShopModel = mongoose.model(DOCUMENT_NAME, shopSchema);

//Export the model
module.exports = ShopModel;
