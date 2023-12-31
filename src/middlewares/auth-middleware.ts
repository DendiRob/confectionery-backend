import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";

export interface GetUserAuthRequest extends Request {
    user: object
  }

export default function(req: GetUserAuthRequest,res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthorizedError())
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError())
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData){
            return next(ApiError.UnauthorizedError())
        }

        req.user = userData;
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}