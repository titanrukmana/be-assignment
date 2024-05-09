class NotFoundError extends Error {
	public constructor() {
		super();

		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}
