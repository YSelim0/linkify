import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Link, LinkSchema } from "./schemas/link.schema";
import { LinkController } from "./link.controller";
import { LinkService } from "./link.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Link.name,
                schema: LinkSchema
            }
        ])
    ],
    controllers: [LinkController],
    providers: [LinkService]
})
export class LinkModule {}
