import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../models/roles.model';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesRepository {
  constructor(@InjectModel(Role) private readonly roleModel: typeof Role) {}

  create(dto: CreateRoleDto) {
    return this.roleModel.create(dto);
  }

  getByValue(value: string) {
    return this.roleModel.findOne({ where: { value } });
  }
}
