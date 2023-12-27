import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import helmet from "helmet";
import compression from "compression";
import * as express from "express";

import { UserModule } from "@modules/user/user.module";
import config from "@config/index";
import { AuthModule } from "@modules/auth/auth.module";
import { LinkModule } from "@modules/link/link.module";

@Module({
    imports: [
        UserModule,
        AuthModule,
        LinkModule,
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get("databaseURI"),
                useNewUrlParser: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class AppModule {
    constructor() {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(helmet(), compression()).forRoutes("*");

        consumer.apply(express.json(), express.urlencoded({ extended: false })).forRoutes("*");
    }
}
