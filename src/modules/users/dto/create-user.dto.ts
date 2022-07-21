import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'someUser@gmail.com', description: 'Email address' })
  readonly email: string;

  @ApiProperty({ example: 'HelloWorld123', description: 'Password' })
  readonly password: string;
}
