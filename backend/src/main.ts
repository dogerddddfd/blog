import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require('dotenv');

dotenv.config({ path: process.env.ENV_FILE });
const port = process.env.BACKEND_PORT

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!port) {
    throw new Error('未指定后端端口')
  }
  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
