import { ROLE_REPOSITORY } from "src/utils/constants";
import { RoleModel } from "../models/role.model";

export const roleProviders = [
    {
        provide: ROLE_REPOSITORY,
        useValue: RoleModel
    }
]