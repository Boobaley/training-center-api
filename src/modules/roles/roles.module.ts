import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';

import { Role } from './models/roles.model';
import { User } from '../users/models/users.model';
import { UserRoles } from './models/user-roles.model';
import { RolesRepository } from './repository/roles.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles]), forwardRef(() => UsersModule)],
  providers: [RolesService, RolesRepository],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
