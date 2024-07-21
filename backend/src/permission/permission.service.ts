import { HttpException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';
import { UserInfoDto } from './dto/uesr-info.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createPermissionDto: CreatePermissionDto) {
    const existPermission = await this.permissionRepository.findOne({
      where: {
        name: createPermissionDto.name
      }

    })
    if(existPermission){
      throw new HttpException('权限字段已存在',409)
    }
    return await this.permissionRepository.save(createPermissionDto)
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username }
    })
  }

  async findPermissionNames(userInfo:UserInfoDto){
    const user = await this.usersRepository.findOne({
      where:{
        username:userInfo.username
      },
      relations:['roles','roles.permissions']
    })
    if(user){
      const permission = user.roles.flatMap(role=>role.permissions)
      const permissionName = permission.map(item=>item.name)
      return [... new Set(permissionName)]
    }
  }

  async test() {
    return 'success'
  }
}
