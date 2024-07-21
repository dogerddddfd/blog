import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from "argon2"
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async register(registerDto: RegisterDto) {
    const user = await this.usersRepository.findOne({
      where: { username: registerDto.username }
    })
    if (user) {
      throw new HttpException('用户名已存在', 401)
    }
    


    try {
      console.log(registerDto.roleIds)
      const roles = await this.roleRepository.find({
        where: {
          id: In(registerDto.roleIds || [1] ),
        },
      });

      
      const newUserData = {
        username: registerDto.username,
        password: await hash(registerDto.password),
        roles: roles
      }
      console.log(newUserData)
      const newUser = await this.usersRepository.save(newUserData)
      return newUser
    } catch (error) {
      console.log(error)
      throw new HttpException(error, 500);
    }
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username }
    })
  }

}
