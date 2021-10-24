import { Injectable, Inject } from "@nestjs/common";
import { USER_REPOSITORY, ROLE_REPOSITORY, PASSWORD_LENGTH_GENERATED } from "src/common/constants";
import { RoleModel } from "src/database/models/role.model";
import { UserModel } from "src/database/models/user.model";
import { CreateUserRequest } from "./dto/create.user.request";
import { LoginRequest } from "./dto/login.request";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof RoleModel, private jwtService: JwtService) { }

    async createUser(userToCreate: CreateUserRequest): Promise<UserModel> {
        let userRole = await this.roleRepository.findOne({where: {name: 'user'}});
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var randomString = '';
        for (var i = 0; i < PASSWORD_LENGTH_GENERATED; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(randomNumber, randomNumber + 1);
        }
        let userTo = { ...userToCreate, password: randomString, roleId: userRole.id};
        return this.userRepository.create(userTo);
    }
    async validateUser(data: any) : Promise<boolean> {
        let foundUser = await this.userRepository.findOne({ where: {email: data['email']}, include: [{model: RoleModel}]});

        return foundUser && foundUser.roleId === data['roleId'] && foundUser.id === data['id'] && foundUser.role.name === data['role'] && (!foundUser.teamId || foundUser.teamId == data['teamId']);
    }
    async validateAdmin(data: any) : Promise<boolean> {
        let foundUser = await this.userRepository.findOne({ where: {email: data['email']}, include: [{model: RoleModel}]});
        return foundUser && foundUser.roleId === data['roleId']
                && foundUser.id === data['id'] && foundUser.role.name === data['role']
                && foundUser.role.name === 'admin' && (!foundUser.teamId || foundUser.teamId == data['teamId']);
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
            const payload = {
                id: found.id,
                roleId: found.roleId,
                role: found.role.name,
                email: found.email,
                teamId: found.teamId
            }
            const jwt = this.jwtService.signAsync(payload);

            return jwt;
        }
        catch (e)
        {
            return null;
        }
    }

}
