import { SetMetadata } from '@nestjs/common';
import { Role } from '../../users/models/enum/role.enum';

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: Role[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
