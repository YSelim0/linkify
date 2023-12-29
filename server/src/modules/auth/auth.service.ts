import { CreateProfileDTO } from "@modules/auth/dto/create-profile.dto";
import { UserDocument } from "@modules/user/schemas/user.schema";
import { UserService } from "@modules/user/user.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginProfileDTO } from "./dto/login-profile.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async isFieldTaken(fieldName: string, fieldValue: string) {
        return this.userService.findOneBy({ [fieldName]: fieldValue });
    }

    async register(user: CreateProfileDTO): Promise<UserDocument> {
        if (await this.isFieldTaken("email", user.email)) {
            throw new BadRequestException("Email is already taken");
        }

        if (await this.isFieldTaken("slug", user.slug)) {
            throw new BadRequestException("Slug is already taken");
        }

        const createdUser = await this.userService.create(user);
        return this.userService.findById(createdUser._id);
    }

    async login(user: LoginProfileDTO): Promise<UserDocument> {
        const currentUser = await this.userService.findOneBy({ email: user.email }).select("+password");

        if (!currentUser) {
            throw new BadRequestException("Email or password is incorrect");
        }
        
        const isPasswordsMatch: boolean = await bcrypt.compare(user.password, currentUser.password);
        
        if (!isPasswordsMatch) {
            throw new BadRequestException("Email or password is incorrect");
        }

        const authenticatedUser =  await this.userService.findById(currentUser._id).populate({ path: "links", model : "Link" });
        
        return authenticatedUser;
    }
}
