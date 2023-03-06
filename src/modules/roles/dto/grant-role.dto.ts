import { ApiProperty } from "@nestjs/swagger";

export class GrantRoleDto {
  @ApiProperty({ description: 'Role name', example: 'SuperAdmin' })
  readonly value: string;

  @ApiProperty({ description: 'User id who will be granted a role', example: 1 })
  readonly userId: number;
}
