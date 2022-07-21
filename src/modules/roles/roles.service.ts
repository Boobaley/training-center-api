import { Injectable } from '@nestjs/common';

import { RolesRepository } from './repository/roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  createRole(roleDto: CreateRoleDto) {
    return this.rolesRepository.create(roleDto);
  }

  getRoleByValue(roleValue: string) {
    return this.rolesRepository.getByValue(roleValue);
  }
}
