import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Link, LinkSchema } from "./schemas/link.schema";
import { LinkController } from "./link.controller";
import { LinkService } from "./link.service";
import { UserModule } from "@modules/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("jwtSecret"),
                signOptions: { expiresIn: "1d" }
            }),
            inject: [ConfigService]
        }),
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
