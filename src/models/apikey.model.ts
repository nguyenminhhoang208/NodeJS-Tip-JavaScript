// lưu trữ token từ ngày này -> tháng này

const mongoose = require('mongoose'); // Erase if already required

const COLLECTION_NAME: string = 'apikeys';
const DOCUMENT_NAME: string = 'apikey';

// Declare the Schema of the Mongo model
var apikeySchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: Boolean,
			default: true,
		},
		// admin cung cấp các permissions cho user, user add vào header
		// của request -> server verify nếu thành công thì cho passed qua
		// (cho phép truy cập)
		permissions: {
			type: [String],
			require: true,
			enum: ['0000', '1111', '2222'],
		},
	},
	{
		timestamp: true,
		collection: COLLECTION_NAME,
	}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apikeySchema);
