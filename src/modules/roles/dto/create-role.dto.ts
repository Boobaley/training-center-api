import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin' })
  readonly value: string;

  @ApiProperty({ example: 'admin role description' })
  readonly description: string;
}
