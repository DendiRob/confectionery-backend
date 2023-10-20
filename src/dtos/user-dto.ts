import { Document, Types } from "mongoose";

interface UserDtoTypes extends Document {
    email: string;
    isActivated: boolean;
}

export default class UserDto {
    email;
    id: Types.ObjectId; 
    isActivated;

    constructor(model: UserDtoTypes) {
        this.email = model.email;
        this.id = model._id; 
        this.isActivated = model.isActivated;
    }
}