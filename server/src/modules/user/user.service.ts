import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { BaseService } from "@common/services/base.service";

@Injectable()
export class UserService extends BaseService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
        super(userModel);
    }

    async getAllUsers() {
        const users =  await this.userModel.find().populate({ path: 'links', model : 'Link' });
        
        return users;
    }
}
