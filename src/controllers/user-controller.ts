import { Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error.js';

import userService from '../service/user-service.js';


const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return next(ApiError.BadRequest('Ошибка валидаций', errors.array()))
        }
        const {email, password} = req.body;
        const userData = await userService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true  }) //first-name second-data for cookie
        
        return res.json(userData)
    } catch(e) {
        next(e)
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const userData = await userService.login(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true  }) //first-name second-data for cookie
        
        return res.json(userData)
    } catch(e) {
        next(e);
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {   
        const {refreshToken} = req.cookies;
        const token = await userService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json(token)
    } catch(e) {
        next(e);
    }
};
const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activationLink = req.params.link; //динамический параметр указанный в роутах
        await userService.activate(activationLink)

        return res.redirect(process.env.CLIENT_URL as string) //редирект на клиент сайт,если сервер находится на другом хочте, в нашем случае не надо
    } catch (e) {
        next(e);
    }
};
const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        const userData = await userService.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true  })
        return res.json(userData)
    } catch (e) {
        next(e)
    }

}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers()
        return res.json(users)
    } catch(e) {
        next(e);
    }
};


export {
    registration,
    login,
    logout,
    getUsers,
    activate,
    refresh
}