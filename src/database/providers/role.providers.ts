/* eslint-disable prettier/prettier */
import { ROLE_REPOSITORY } from 'src/common/constants';
import { RoleModel } from '../models/role.model';

export const roleProviders = [
  {
    provide: ROLE_REPOSITORY,
    useValue: RoleModel,
  },
];
