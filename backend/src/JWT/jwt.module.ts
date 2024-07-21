import { JwtModule } from '@nestjs/jwt';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
   imports: [
     JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
       global: true,
       useFactory:async(configService : ConfigService)=>{
         return{
            secret: configService.get('JWT_SECRET'),
            global: true,
            signOptions: {
               expiresIn: '1d'
             }
         }
       }
     })
   ],
   controllers: [],
   providers: [],
 })
 export class jwtModule { }