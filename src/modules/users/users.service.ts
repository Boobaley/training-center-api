import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  findAllUsers() {
    return this.usersRepository.findAll();
  }
}
