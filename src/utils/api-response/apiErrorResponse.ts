interface IFieldError {
    field: string;
    message: string;
}

interface IApiError {
    status: boolean;
    statusCode: number;
    message: string;
    errors: IFieldError[] | [];
    data?: any;
}

class ApiErrorResponse extends Error implements IApiError {
    status: boolean;
    statusCode: number;
    data?: any;
    errors: IFieldError[];

    constructor(statusCode: number, message: string, errors: IFieldError[] = [], data?: any, stack?: string) {
        super(message);
        this.status = false;
        this.statusCode = statusCode;
        this.data = data || null;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            status: this.status,
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
            data: this.data,
            stack: this.stack,
        };
    }
}


export default ApiErrorResponse;
