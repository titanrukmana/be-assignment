"use strict";
class NotFoundError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}
