import {
    BAD_REQUEST_CODE,
    NOT_FOUND_CODE,
    UNAUTHORIZED_CODE,
} from '../configs/status-codes';

export class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status = NOT_FOUND_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class AuthError extends Error {
    status = UNAUTHORIZED_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}

