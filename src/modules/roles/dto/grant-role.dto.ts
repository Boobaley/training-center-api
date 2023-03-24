import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GrantRoleDto {
  @ApiProperty({ description: 'Role name', example: 'SuperAdmin' })
  @IsString({ message: 'Must be a string' })
  readonly value: string;

  @ApiProperty({ description: 'User id who will be granted a role', example: 1 })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Must be a number' })
  readonly userId: number;
}
