export type ErrorCodeType = 404 | 403 | 401 | 500;
export abstract class CustomError extends Error {
    constructor(public message: string, public code?: ErrorCodeType) {
        super(message);
        this.code = code ?? 500;
    }
}

export class NotFroundError extends CustomError {
    constructor(public readonly message: string) {
        super(message ?? 'Resource not found');
        this.message = message ?? 'Resource not found';
        this.code = 404;
    }
}

export class ServerError extends CustomError {
    constructor(public readonly message: string) {
        super(message ?? 'Error from server occurred');
        this.message = message ?? 'Error from server occurred';
        this.code = 500;
    }
}
export class PermissionError extends CustomError {
    constructor(public readonly message: string) {
        super(message ?? 'You do not have permission to perform this action');
        this.message = message ?? 'You do not have permission to perform this action';
        this.code = 403;
    }
}
