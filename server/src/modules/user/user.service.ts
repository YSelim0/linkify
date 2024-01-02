import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { BaseService } from "@common/services/base.service";
import { JwtService } from "@nestjs/jwt";
import { UpdateUserDTO } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService extends BaseService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService    
    ) {
        super(userModel);
    }

    async isFieldTaken(fieldName: string, fieldValue: string) {
        return this.findOneBy({ [fieldName]: fieldValue });
    }

    async updateUserPhoto(jwtUserId: string, photoUrl: string) {
        const jwtControl = await this.jwtService.verifyAsync(jwtUserId);

        if (!jwtControl) {
            throw new BadRequestException("Invalid JWT");
        }
        
        const userId = await this.jwtService.decode(jwtUserId).userId;
        const user: UserDocument = await this.findById(userId);
        
        if (!user) {
            throw new BadRequestException("User not found.");
        }

        user.profilePhoto = photoUrl;
        await user.save();

        return user;
    }

    async updateUser (user: UpdateUserDTO) {
        const jwtControl = await this.jwtService.verifyAsync(user.jwtUserId);

        if (!jwtControl) {
            throw new BadRequestException("Invalid JWT");
        }

        const userId = await this.jwtService.decode(user.jwtUserId).userId;
        const userToUpdate = await this.findById(userId).select("+password");        

        if (!userToUpdate) {
            throw new BadRequestException("User not found.");
        }

        const isSlugTaken = await this.isFieldTaken("slug", user.slug);
        
        if (user.slug && isSlugTaken && isSlugTaken._id != userId) {
            throw new BadRequestException("Slug already taken.");
        }

        userToUpdate.displayName = user.displayName || userToUpdate.displayName;
        userToUpdate.slug = user.slug || userToUpdate.slug;
        userToUpdate.biography = user.biography || userToUpdate.biography;
        userToUpdate.theme = user.theme || userToUpdate.theme;
        
        if (user.password) {
            userToUpdate.password = user.password;
        }

        await userToUpdate.save();
        return await userToUpdate.populate({ path: "links", model : "Link" });
    }
}
