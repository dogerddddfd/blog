//  src\auth\auth.controller.ts
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { Public } from 'src/public/public.decorator';

@Controller('auth')
export class AuthController {

   constructor(
      private readonly authService: AuthService
   ) { }

   // 登录
   @Public()
   @Post('login')
   login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
   }


   // 注册
   // @Public()
   // @Post('register')
   // async register(@Body() registerDto: RegisterDto) {
   //    return this.authService.register(registerDto);
   // }

   // 测试
   @Public()
   @Get('test')
   async test(){
      return this.authService.test();
   }

   // @UseGuards(AuthGuard)
   @Get('guard_test')
   async guardTest(){
      return this.authService.guardTest();
   }
}
