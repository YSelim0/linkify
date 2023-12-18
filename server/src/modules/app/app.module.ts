import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import helmet from "helmet";
import * as compression from "compression";
import * as express from "express";

import { UserModule } from "@modules/user/user.module";
import config from "@config/index";

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            load: [config],
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get('databaseURI'),
                useNewUrlParser: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class AppModule {
    constructor() {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(helmet(), compression()).forRoutes('*');

        consumer.apply(express.json(), express.urlencoded({ extended: false })).forRoutes('*');
    }
}
