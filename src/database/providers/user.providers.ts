/* eslint-disable prettier/prettier */
import { USER_REPOSITORY } from "src/common/constants";
import { UserModel } from "../models/user.model";

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: UserModel
    }
]