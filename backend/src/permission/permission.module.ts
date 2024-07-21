import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission.guard';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission,User,Role]),
  ],
  controllers: [PermissionController],
  providers: [PermissionService,
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }],
})
export class PermissionModule { }
