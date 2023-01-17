import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../models/users.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly rolesService: RolesService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    const role = await this.rolesService.getRoleByValue('student');

    await user.$set('roles', [role.id]);

    return user;
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }
}
