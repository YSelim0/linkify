import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => {
                    const defaultProfilePhotoURL = `${configService.get("appBaseURL")}/storage/photos/defaults/profile-photo.jpg`;
                    UserSchema.paths.profilePhoto.default(defaultProfilePhotoURL);
                    
                    return UserSchema;
                },
                inject: [ConfigService],
            }
        ]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get("jwtSecret"),
                signOptions: { expiresIn: "1d" }
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [UserController], 
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
