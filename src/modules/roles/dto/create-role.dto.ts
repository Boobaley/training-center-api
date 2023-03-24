import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '../types/roles.enum';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  @IsString()
  @IsEnum(RolesEnum)
  readonly value: string;

  @ApiProperty({ example: 'admin role description' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
