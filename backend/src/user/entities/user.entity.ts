import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn,ManyToMany,JoinTable } from 'typeorm';
import {Role} from '../../role/entities/role.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')

  id: number;

  @Column({ length: 30 })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[]; //角色

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}