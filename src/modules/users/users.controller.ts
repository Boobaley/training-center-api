import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/users.model';
import { BanUserDto } from './dto/ban-user.dto';
import { Role } from '../roles/models/roles.model';
import { GrantRoleDto } from '../roles/dto/grant-role.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.findAllUsers();
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: [User] })
  @Patch('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.banUser(dto);
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: [User] })
  @Patch('/:userId/unban')
  unBan(@Param('userId') userId: number) {
    return this.usersService.unbanUser(userId);
  }

  @ApiOperation({ summary: 'Add role' })
  @ApiResponse({ status: 200, type: Role })
  @Patch('/role')
  addRole(@Body() dto: GrantRoleDto) {
    return this.usersService.grantRole(dto);
  }
}
