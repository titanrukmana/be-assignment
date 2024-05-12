export class NotFoundError extends Error {
	public constructor(message?: string) {
		super(message);

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class BadRequestError extends Error {
	public constructor(message?: string) {
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}
