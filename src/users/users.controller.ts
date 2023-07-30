import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../serialize.interceptor/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth/auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    console.log(session);
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    console.log(session);
    return session.color;
  }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.authService.signUp(email, password);
  }

  @Post('/signin')
  signIn(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    return this.authService.signIn(email, password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
