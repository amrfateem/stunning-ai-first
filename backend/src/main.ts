import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // allow requests from frontend
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend running on http://0.0.0.0:${port}`);
}
bootstrap();
