import { Response } from 'express';

enum StatusCode {
	OK = 200,
	CREATED = 201,
}
enum ReasonStatusCode {
	OK = 'OK!!',
	CREATED = 'CREATED!!',
}

class SuccessResponse {
	message!: string;
	code!: number;
	reasonStatusCode!: string;
	metadata!: object;
	constructor({
		message,
		metadata = {},
		statusCode = StatusCode.OK,
		reasonStatusCode = ReasonStatusCode.OK,
	}: {
		message?: string;
		metadata?: object;
		statusCode?: number;
		reasonStatusCode?: string;
	}) {
		this.message = message ? message : reasonStatusCode;
		this.code = statusCode;
		this.reasonStatusCode = reasonStatusCode;
		this.metadata = metadata;
	}

	send(res: Response, header: object = {}) {
		return res.status(this.code).json(this);
	}
}

class OK extends SuccessResponse {
	constructor({ message, metadata }: { message: string; metadata: object }) {
		super({ message, metadata });
	}
}

class CREATED extends SuccessResponse {
	options: object = {};
	constructor({
		options = {},
		message,
		metadata = {},
		statusCode = StatusCode.CREATED,
		reasonStatusCode = ReasonStatusCode.CREATED,
	}: {
		options?: object;
		message?: string;
		metadata?: object;
		statusCode?: number;
		reasonStatusCode?: string;
	}) {
		super({ message, metadata, statusCode, reasonStatusCode });
		this.options = options;
	}
}

module.exports = {
	OK,
	CREATED,
};
