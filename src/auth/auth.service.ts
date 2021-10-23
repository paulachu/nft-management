import { Injectable, Inject } from "@nestjs/common";
import { USER_REPOSITORY, ROLE_REPOSITORY, SECRET_KEY_USER, SECRET_KEY_ADMIN } from "src/common/constants";
import { RoleModel } from "src/database/models/role.model";
import { UserModel } from "src/database/models/user.model";
import { CreateUserRequest } from "./dto/create.user.request";
import { LoginRequest } from "./dto/login.request";


@Injectable()
export class AuthService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof RoleModel) { }

    async createUser(userToCreate: CreateUserRequest): Promise<UserModel> {
        let userRole = await this.roleRepository.findOne({where: {name: 'user'}});
        let userTo = { ...userToCreate, password: 'ok', roleId: userRole.id};
        return this.userRepository.create(userTo);
    }
    isAdmin(): Boolean {
        return true;
    }
    async login(loginForm: LoginRequest): Promise<string> {
        try {
            let found = await this.userRepository.findOne({
                where: {
                    password: loginForm.password,
                    email: loginForm.email
                },
                include: [{model: RoleModel}]
            });
            if (found.role.name === 'user')
            {
                return SECRET_KEY_USER;
            }
            else if (found.role.name === 'admin')
            {
                return SECRET_KEY_ADMIN;
            }
            return null;
        }
        catch (e)
        {
            return null;
        }
    }
}
