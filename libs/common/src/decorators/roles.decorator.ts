import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../constants';

export const ROLE_KEY = 'ROLE_METADATA';

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLE_KEY, roles);
