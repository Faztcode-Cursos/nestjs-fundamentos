import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/users')
  @ApiTags('users')
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('/users')
  @ApiTags('users')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
