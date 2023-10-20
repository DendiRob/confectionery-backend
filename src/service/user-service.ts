import UserModel from "../models/user.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import MailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";


class UserService {
    async registration(email: string, password: string){
        const candidate = await UserModel.findOne({email})
        if(candidate){
            throw new Error(`пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuidv4();

        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await MailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
        
        const userDto = new UserDto(user) //delete unnecessary data
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}
export default new UserService()