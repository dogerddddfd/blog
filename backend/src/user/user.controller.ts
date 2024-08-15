import { Controller, Get, Post, Body, Param, Req, Query} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/public/public.decorator';
import { SearchUserDto } from './dto/search-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Get('')
  findAllUser(@Query() searchUserDto: SearchUserDto) {
    console.log(searchUserDto)
    return this.userService.findAllUser(searchUserDto);
  }
}
