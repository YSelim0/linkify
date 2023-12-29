import { Body, Controller, Delete, Get, Param, Post, Put, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateLinkDTO } from "./dto/create-link.dto";
import { LinkService } from "./link.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileFilter } from "@common/utils/file-filter.util";
import { ConfigService } from "@nestjs/config";
import { DeleteLinkDTO } from "./dto/delete-link.dto";
import { UpdateLinkDTO } from "./dto/update-link.dto";
import { UpdateLinkPhotoDTO } from "./dto/update-link-photo.dto";

@Controller("link")
export class LinkController {
    constructor(
        private readonly linkService: LinkService,
        private readonly configService: ConfigService
    ) {}

    @Post("create")
    @UseInterceptors(
        FileInterceptor("link-photo", {
            dest: "dist/storage/photos/links/link-photos",
            fileFilter: fileFilter(["image/jpeg", "image/jpg", "image/png"])
        })
    )
    async createLink(@UploadedFile() file: Express.Multer.File, @Body() link: CreateLinkDTO) {
        const photoUrl = `${this.configService.get(
            "appBaseURL"
          )}/api/link/photo/${file.filename}`;

        const createdLink = await this.linkService.createLink(link, photoUrl);

        return {
            message: "Link created successfully",
            payload: {
                link: createdLink
            }
        };
    }

    @Get("photo/:photoName")
    async getLinkPhoto(@Param("photoName") photoName: string, @Res() res: any) {
        res.sendFile(photoName, { root: "dist/storage/photos/links/link-photos" });
    }

    @Delete("delete")
    async deleteLink(@Body() link: DeleteLinkDTO) {
        await this.linkService.deleteLink(link);

        return {
            message: "Link deleted successfully"
        };
    }

    @Put("update")
    async updateLink(@Body() link: UpdateLinkDTO) {
        const updatedLink = await this.linkService.updateLink(link);

        return {
            message: "Link updated successfully",
            payload: {
                link: updatedLink
            }
        };
    }

    @Put("update-photo")
    @UseInterceptors(
        FileInterceptor("link-photo", {
            dest: "dist/storage/photos/links/link-photos",
            fileFilter: fileFilter(["image/jpeg", "image/jpg", "image/png"])
        })
    )
    async updateLinkPhoto(@UploadedFile() file: Express.Multer.File, @Body() link: UpdateLinkPhotoDTO) {
        const photoUrl = `${this.configService.get(
            "appBaseURL"
          )}/api/link/photo/${file.filename}`;

        const updatedLink = await this.linkService.updateLinkPhoto(link, photoUrl);

        return {
            message: "Link photo updated successfully",
            payload: {
                link: updatedLink
            }
        };
    }
}
