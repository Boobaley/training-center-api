import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { GrantRoleDto } from '../roles/dto/grant-role.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
  ) {}

  createUser(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  findAllUsers() {
    return this.usersRepository.findAll();
  }

  getUserByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  private userNotFound() {
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async grantRole(dto: GrantRoleDto) {
    const user = await this.usersRepository.findByPrimaryKey(dto.userId);
    const role = await this.rolesService.getRoleByValue(dto.value);

    if (!user) {
      this.userNotFound();
    }

    if (!role) {
      throw new HttpException('Invalid Role', HttpStatus.NOT_FOUND);
    }

    await user.$add('role', role.id);

    return user;
  }

  async banUser(dto: BanUserDto) {
    const user = await this.usersRepository.findByPrimaryKey(dto.userId);

    if (!user) {
      this.userNotFound();
    }

    user.banned = true;
    user.banReason = dto.reason;

    await user.save();

    return user;
  }

  async unbanUser(userId) {
    console.log(userId);
    const user = await this.usersRepository.findByPrimaryKey(userId);

    if (!user) {
      this.userNotFound();
    }

    user.banned = false;
    user.banReason = null;

    await user.save();

    return user;
  }
}
