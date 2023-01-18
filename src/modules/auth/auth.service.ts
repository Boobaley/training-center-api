import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST);
    }

    const salt = 5;
    const passwordHash = await bcrypt.hash(userDto.password, salt);

    const newUser = await this.userService.createUser({ ...userDto, password: passwordHash });

    return this.generateToken(newUser);
  }

  async signIn(userDto: CreateUserDto) {
    const validatedUser = await this.validateUser(userDto);

    return this.generateToken(validatedUser);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, email: user.email, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);

    if (user && isPasswordValid) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Email or Password is incorrect' });
  }
}
