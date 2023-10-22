import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import UserModel from "../models/user.js";
import MailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";
import ApiError from '../exceptions/api-error.js';



class UserService {
    async registration(email: string, password: string){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw ApiError.BadRequest(`пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await MailService.sendActivationMail(email, `${process.env.API_URL}activate/${activationLink}`);
        
        const userDto = new UserDto(user) //DTO defines the necessary data for registration
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email: string, password: string) {
        const user = await UserModel.findOne({email})
        if(!user){
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...UserDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async activate(activationLink: string){

        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest(`Неккоректная ссылка актвиаций`)
        }
            user.isActivated = true;
        await user.save();
    }
}
export default new UserService()