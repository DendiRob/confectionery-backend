import { ValidationError } from "express-validator";

type errorsType = string[] | ValidationError[]

export default class ApiError extends Error {

    status;
    errors;

    constructor(status: number, message: string, errors: errorsType = []){
        super(message);
        this.status = status;
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message: string, errors: errorsType){
        return new ApiError(400, message, errors);
    }

    static ProductNotExits(message: string, errors: errorsType){
        return new ApiError(500, message, errors)
    }
}