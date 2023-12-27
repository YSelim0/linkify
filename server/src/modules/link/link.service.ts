import { BadRequestException, Injectable } from "@nestjs/common";
import { Link, LinkDocument } from "./schemas/link.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateLinkDTO } from "./dto/create-link.dto";
import { JwtService } from "@nestjs/jwt";
import { BaseService } from "@common/services/base.service";
import { UserService } from "@modules/user/user.service";
import { DeleteLinkDTO } from "./dto/delete-link.dto";

@Injectable()
export class LinkService extends BaseService {
    constructor(
        @InjectModel(Link.name) private linkModel: Model<LinkDocument>,
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
        super(linkModel);
    }

    async createLink(link: CreateLinkDTO, photoUrl: string) {
        const jwtControl = await this.jwtService.verifyAsync(link.jwtUserId);

        if (!jwtControl) {
            throw new BadRequestException("Invalid JWT");
        }

        const userId = this.jwtService.decode(link.jwtUserId).userId;
        const createdLink = await this.create({ ...link, photoUrl, userId });

        await this.userService.updateById(userId, { $push: { links: createdLink._id } });

        return createdLink;
    }

    async deleteLink(link: DeleteLinkDTO) {
        const jwtControl = await this.jwtService.verifyAsync(link.jwtUserId);

        if (!jwtControl) {
            throw new BadRequestException("Invalid JWT");
        }

        const userId = this.jwtService.decode(link.jwtUserId).userId;
        const currentLink: LinkDocument = await this.findById(link.linkId);

        if (!currentLink) {
            throw new BadRequestException("Link not found.");
        }
        
        if (currentLink.userId != userId) {
            throw new BadRequestException("This link does not belong to user.");
        }

        await this.userService.updateById(userId, { $pull: { links: link.linkId } });
        await this.deleteById(link.linkId);
    }
}
