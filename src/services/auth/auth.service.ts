import { Inject, Injectable } from '@nestjs/common';
import { RoleModel } from 'src/data/models/role.model';
import { UserModel } from 'src/data/models/user.model';
import { CreateUserRequest } from 'src/dto/auth/create.user.request';
import { LoginRequest } from 'src/dto/auth/login.request';
import { ROLE_REPOSITORY, SECRET_KEY_ADMIN, SECRET_KEY_USER, USER_REPOSITORY } from 'src/utils/constants';

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
