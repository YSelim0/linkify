import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateProfileDTO } from "@modules/user/dto/create-profile.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async createProfile(@Body() user: CreateProfileDTO) {
        const profile = await this.authService.register(user);

        return {
            message: 'Profile created successfully',
            payload: {
                user: profile
            }
        };
    }
}
