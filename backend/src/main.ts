import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const dotenv = require('dotenv');

dotenv.config({ path: process.env.ENV_FILE });
const port = process.env.BACKEND_PORT
const host = process.env.BACKEND_HOST || "localhost"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (!port) {
    throw new Error('未指定后端端口')
  }
  console.log(`Server is running on http://${host}:${port}`);
  await app.listen(port);
}
bootstrap();
