import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateProfileDTO } from "./dto/create-profile.dto";
import { LoginProfileDTO } from "./dto/login-profile.dto";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) {}

    @Post("register")
    async createProfile(@Body() user: CreateProfileDTO) {
        const profile = await this.authService.register(user);

        return {
            message: "Profile created successfully",
            payload: {
                user: profile,
                jwtUserId: await this.jwtService.signAsync({ userId: profile._id })
            }
        };
    }

    @Post("login")
    async loginProfile(@Body() user: LoginProfileDTO) {
        const profile = await this.authService.login(user);

        return {
            message: "Logged in successfully",
            payload: {
                user: profile,
                jwtUserId: await this.jwtService.signAsync({ userId: profile._id })
            }
        };
    }
}
