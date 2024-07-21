import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from 'src/user/entities/user.entity';


@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => {
            // async configuration options
            return {
               type: "postgres",
               synchronize: true,
               autoLoadEntities: true, //自动加载实体
               host: configService.get('POSTGRES_HOST'),
               port: configService.get('POSTGRES_PORT'), // 端口号
               username: configService.get('POSTGRES_USER'), // 用户名
               password: configService.get('POSTGRES_PASSWORD'), // 密码
               database: configService.get('POSTGRES_DB'), //数据库名
               entities:[User]
            };
         },
      })
   ]
})
export class TypeormModule {
}
