import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { PostService } from './post.service';
import { PrismaController } from './prisma.controller';


@Module({
  imports: [],
  controllers: [PrismaController],
  providers: [UserService,PostService,PrismaService],
})
export class PrismaModule {}
