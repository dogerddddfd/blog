//  src\auth\auth.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from '../user/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

import { hash, verify } from "argon2"
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }


  async login(loginDto: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { username: loginDto.username }
    })

    if (user) {
      const isPasswordCorrect = await verify(user.password, loginDto.password)
      if (isPasswordCorrect) {

        const payload = {
          id: user.id,
          username: user.username
        }

        const token = await this.jwtService.signAsync(payload)

        return {
          statusCode: 200,
          message: '登陆成功',
          data: {
            token
          },
        }
      } else {
        throw new HttpException('密码错误', 401)
      }
    } else {
      throw new HttpException('用户不存在', 401)
    }
    return loginDto
  }


  async test() {
    return 'success'
  }

  async guardTest() {
    return 'guard success'
  }
}