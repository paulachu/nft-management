import { USER_REPOSITORY } from "src/utils/constants";
import { UserModel } from "../models/user.model";

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: UserModel
    }
]