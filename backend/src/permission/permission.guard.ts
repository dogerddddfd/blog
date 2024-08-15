import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PermissionService } from './permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    interface CusRequest extends Request {
      user?: any;
    }
    const request: CusRequest = context.switchToHttp().getRequest();
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'permissions',
      [
        context.getClass(),
        context.getHandler()
      ]
    ) || []
    if (requiredPermissions.length === 0) return true;
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    const permissionName = await this.permissionService.findPermissionNames(request.user)
    console.log(permissionName)

    const isContainedPermission = requiredPermissions.every(item =>
      permissionName.includes(item)
    )
    if (!isContainedPermission) {
      throw new HttpException('权限不足', 403)
    }
    return true;
  }
}
