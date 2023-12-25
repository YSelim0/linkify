import { CreateProfileDTO } from "@modules/user/dto/create-profile.dto";
import { UserDocument } from "@modules/user/schemas/user.schema";
import { UserService } from "@modules/user/user.service";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async isFieldTaken(fieldName: string, fieldValue: string) {
        return this.userService.findOneBy({ [fieldName]: fieldValue });
    }

    async register(user: CreateProfileDTO): Promise<UserDocument> {
        if (await this.isFieldTaken('email', user.email)) {
            throw new BadRequestException('Email is already taken');
        }

        const createdUser = await this.userService.create(user);
        return this.userService.findById(createdUser._id);
    }
}
