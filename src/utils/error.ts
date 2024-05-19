export enum AllowedErrorCode {
    NOT_FOUND = 404,
    VALIDATION_ERROR = 400
}

export class ApiError extends Error {
    public statusCode: AllowedErrorCode;
    public message: string;

    constructor(code: AllowedErrorCode, message: string) {
        super(message);
        this.statusCode = code;
        this.message = message;

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}