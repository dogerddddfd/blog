import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    //查询传入数组permissionIds的全部permission实体
    const permissions = await this.permissionRepository.find({
      where: {
        id: In(createRoleDto.permissionIDs),
      },
    });
    const name = createRoleDto.name;
    const existRole = await this.roleRepository.findOne({
      where: {
        name
      },
    });

    if (existRole)
      throw new HttpException('角色已存在', 409);
    return this.roleRepository.save({
      permissions, name
    });
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
