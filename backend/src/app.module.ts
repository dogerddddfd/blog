import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { jwtModule } from './JWT/jwt.module';
import { TypeormModule } from './typeorm/typeorm.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ConfigService } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PermissionGuard } from './permission/permission.guard';

@Module({
  imports: [
    TypeormModule,
    AuthModule,
    jwtModule,
    TypeormModule,
    UserModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService,ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
  ],
})
export class AppModule { }
