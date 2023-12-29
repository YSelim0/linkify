import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { BaseService } from "@common/services/base.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService extends BaseService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService    
    ) {
        super(userModel);
    }

    async updateUserPhoto(jwtUserId: string, photoUrl: string) {
        const userId = await this.jwtService.decode(jwtUserId).userId;
        const user: UserDocument = await this.findById(userId);
        
        if (!user) {
            throw new BadRequestException("User not found.");
        }

        user.profilePhoto = photoUrl;
        await user.save();

        return user;
    }
}
