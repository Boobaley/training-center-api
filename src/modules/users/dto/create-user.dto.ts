import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'someUser@gmail.com', description: 'Email address' })
  @IsEmail({}, { message: 'Invalid email address' })
  readonly email: string;

  @ApiProperty({ example: 'HelloWorld123', description: 'Password' })
  @IsString({ message: 'Must be a string' })
  @Length(8, 16, { message: 'Minimum length is 8 chars' })
  readonly password: string;
}
