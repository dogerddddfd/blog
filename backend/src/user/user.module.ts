import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { jwtModule } from 'src/JWT/jwt.module';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Role]),
    jwtModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
