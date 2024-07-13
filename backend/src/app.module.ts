import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';

@Module({
  imports: [UsersModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
