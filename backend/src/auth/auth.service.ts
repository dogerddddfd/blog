//  src\auth\auth.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { hash, verify } from "argon2"
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly jwtService: JwtService,
   ) { }

   async login(loginDto: LoginDto) {
      const user = await this.prisma.user.findFirst({
         where:{
            username:loginDto.username
         }
      })

      if(user){
         const isPasswordCorrect = await verify(user.password,loginDto.password)
         if(isPasswordCorrect){

            const payload = {
               id: user.id,
               username: user.username
            }

            const token = await this.jwtService.signAsync(payload)

            return {
               statusCode:200,
               message:'登陆成功',
               data:{
                  token
               },
            }
         }else{
            throw new HttpException('密码错误',401)
         }
      }else{
         throw new HttpException('用户不存在',401)
      }
      return loginDto
   }

   async register(registerDto: RegisterDto) {
      const user = await this.prisma.user.findFirst({
         where:{
            username:registerDto.username
         }
      })
      if(user){
         throw new HttpException('用户名已存在',401)
      }

      const newUser = await this.prisma.user.create({
         data:{
            username:registerDto.username,
            password:await hash(registerDto.password)
         }
      })
      return newUser
   }

}