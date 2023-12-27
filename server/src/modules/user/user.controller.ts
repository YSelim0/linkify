import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        const users = await this.userService.findAll().populate({ path: "links", model : "Link" });

        return {
            message: "Users fetched successfully",
            payload: {
                users
            }
        };
    }
}
