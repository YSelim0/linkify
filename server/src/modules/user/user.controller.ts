import { Body, Controller, Get, Param, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserPhotoDTO } from "./dto/update-user-photo.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileFilter } from "@common/utils/file-filter.util";
import { ConfigService } from "@nestjs/config";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) {}

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

    @Put("update-photo")
    @UseInterceptors(
        FileInterceptor("user-photo", {
            dest: "dist/storage/photos/users/user-photos",
            fileFilter: fileFilter(["image/jpeg", "image/jpg", "image/png"])
        })
    )
    async updateUserPhoto(@UploadedFile() file: Express.Multer.File, @Body() { jwtUserId }: UpdateUserPhotoDTO) {
        const photoUrl = `${this.configService.get(
            "appBaseURL"
          )}/api/user/photo/${file.filename}`;

        const updatedUser = await this.userService.updateUserPhoto(jwtUserId, photoUrl);

        return {
            message: "User photo updated successfully",
            payload: {
                user: updatedUser
            }
        };
    }

    @Get("photo/:photoName")
    async getUserPhoto(@Param("photoName") photoName, @Res() res: any) {
        res.sendFile(photoName, { root: "dist/storage/photos/users/user-photos" });
    }

    @Put("update")
    async updateUser(@Body() user: UpdateUserDTO) {
        const updatedUser = await this.userService.updateUser(user);

        return {
            message: "User updated successfully",
            payload: {
                user: updatedUser
            }
        };
    }
}
