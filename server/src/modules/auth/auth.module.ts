import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "@modules/user/user.module";
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "@nestjs/config";

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
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}