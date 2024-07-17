import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';


@Module({
  // providers: [AuthService,JwtService,ConfigService],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
