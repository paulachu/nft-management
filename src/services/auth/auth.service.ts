import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'src/data/models/user.model';
import { CreateUserRequest } from 'src/dto/auth/create.user.request';
import { LoginRequest } from 'src/dto/auth/login.request';
import { SECRET_KEY_ADMIN, SECRET_KEY_USER, USER_REPOSITORY } from 'src/utils/constants';

@Injectable()
export class AuthService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel) { }

    async createUser(userToCreate: CreateUserRequest): Promise<UserModel> {
        let userTo = { ...userToCreate, password: 'ok' }
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
                }
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
