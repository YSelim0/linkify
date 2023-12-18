import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                imports: [ConfigModule],
                useFactory: (configService: ConfigService) => {
                    const defaultProfilePhotoURL = `${configService.get('appBaseURL')}/storage/photos/defaults/profile-photo.jpg`;
                    UserSchema.paths.profilePhoto.default(defaultProfilePhotoURL);

                    return UserSchema;
                },
                inject: [ConfigService],
            }
        ])
    ],
    controllers: [UserController], 
    providers: [UserService],
})
export class UserModule {}
