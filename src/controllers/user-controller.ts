import { Request, Response } from 'express';
import userService from '../service/user-service.js';


const registration = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const userData = await userService.registration(email, password);
        res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true  }) //first-name second data for cookie
        return res.json(userData)
    } catch(error) {
        console.log(`при регистрации произошла ошибка ${error}`)
    }
};

const login = async (req: Request, res: Response) => {
    try {

    } catch {

    }
};

const logout = async (req: Request, res: Response) => {
    try {

    } catch {

    }
};

const getUsers = async (req: Request, res: Response) => {
    try {
        res.json([1,2,3]);
    } catch {

    }
};
export {
    registration,
    login,
    logout,
    getUsers
}