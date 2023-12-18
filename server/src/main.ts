import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path';

import { AppModule } from '@modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  
  const configService = app.get<ConfigService>(ConfigService);
  
  app.useStaticAssets(join(__dirname, '../dist/storage/photos'), {
    prefix: '/storage/photos'
  });

  app.set('trust proxy', 1);
  app.setGlobalPrefix('api');
  //http exception filter, validation pipe

  await app.listen(configService.get('port')!);
}
bootstrap();
