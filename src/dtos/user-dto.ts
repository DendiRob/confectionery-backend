import { Document, Types } from "mongoose";

interface UserDtoTypes extends Document {
    email: string;
    isActivated: boolean;
    role: string;
    _id: Types.ObjectId; 
}

export default class UserDto {
    email;
    id;
    isActivated;
    role;

    constructor(model: UserDtoTypes) {
        this.email = model.email!;
        this.id = model._id; 
        this.isActivated = model.isActivated;
        this.role = model.role
    }
}