enum StatusCode {
	FORBIDDEN = 403,
	CONFLICT = 409,
}
enum ReasonStatusCode {
	FORBIDDEN = 'Bad request error!!',
	CONFLICT = 'Conflict error!!',
}

class ErrorResponse extends Error {
	status: number;
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}
}
class ConflictRequestError extends ErrorResponse {
	constructor(
		message: string = ReasonStatusCode.CONFLICT,
		status: number = StatusCode.CONFLICT
	) {
		super(message, status);
	}
}

class BadRequestError extends ErrorResponse {
	constructor(
		message: string = ReasonStatusCode.FORBIDDEN,
		status: number = StatusCode.FORBIDDEN
	) {
		super(message, status);
	}
}

module.exports = {
	BadRequestError,
	ConflictRequestError,
};
