import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { jwtModule } from 'src/JWT/jwt.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';


@Module({
   imports: [
      TypeOrmModule.forFeature([User]),
      jwtModule
   ],
   providers: [AuthService, ConfigService,
      {
         provide: APP_GUARD,
         useClass: AuthGuard
      }
   ],
   // providers: [AuthService],
   controllers: [AuthController]
})
export class AuthModule { }
