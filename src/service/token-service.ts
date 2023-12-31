import jwt, { JwtPayload } from 'jsonwebtoken';
import TokenModel from '../models/token.js';

class TokenService {

    generateTokens(payload: object) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JwtPayload
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: Object, refreshToken: string){
        const tokenData = await TokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await TokenModel.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({refreshToken})
        return tokenData
    }
}
export default new TokenService()