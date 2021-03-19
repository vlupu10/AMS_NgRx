import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
// import * as morgan from 'morgan';
// import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.use(bodyParser.json());
  // app.use(cors());
  // app.use(morgan());

  await app.listen(3000);
}
bootstrap();
