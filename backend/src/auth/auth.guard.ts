import { CanActivate, ExecutionContext, Injectable, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      'isPublic',
      [
        //即将调用的方法
        context.getHandler(),
        //controller类型
        context.getClass(),
      ]
    );
    // return true;
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new HttpException('验证不通过', 403);
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      request['user'] = payload;//传递给perssion.guard做权限验证
    } catch {
      throw new HttpException('token验证失败', 403);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
