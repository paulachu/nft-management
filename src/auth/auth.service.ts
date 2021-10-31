import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PASSWORD_LENGTH_GENERATED } from 'src/common/constants';
import { RoleModel } from 'src/models/role.models';
import { UserModel } from 'src/models/user.models';
import { getRepository } from 'typeorm';
import { CreateUserRequest } from './dto/create.user.request';
import { LoginRequest } from './dto/login.request';
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(private jwtService: JwtService, @InjectRepository(RoleModel) private roleRepository = getRepository(RoleModel),
        @InjectRepository(UserModel) private userRepository = getRepository(UserModel)) {}
    async validateUser(data: any) : Promise<boolean> {
        let foundUser = await this.userRepository.findOne({
            where: {email: data['email']}
            , relations: ['role']});

        return foundUser && foundUser.role.id === data['roleId'] && foundUser.id === data['id'] && foundUser.role.name === data['role'];
    }
    async createUser(userToCreate: CreateUserRequest): Promise<UserModel> {
        let userRole = await this.roleRepository.findOne({where: {name: 'user'}});
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var randomString = '';
        for (var i = 0; i < PASSWORD_LENGTH_GENERATED; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            randomString += chars.substring(randomNumber, randomNumber + 1);
        }
        let userTo = new UserModel();
        userTo.name = userToCreate.name;
        userTo.email = userToCreate.email;
        userTo.blockChainAddress =  userToCreate.blockChainAddress
        userTo.password = randomString
        userTo.role = userRole
        userTo.sells = [];
        userTo.purchases =  []
        userTo.nfts = []
        try {
            const errors = await validate(userTo);
            if (errors.length > 0){
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            }
            const createdUser = await this.userRepository.save(userTo);
            this.logger.log(new Date().getTime() + ' creating user ' + createdUser.name + ' with email ' + createdUser.email
            + ' with role ' + createdUser.role.name);
            return createdUser;
        }
        catch(e)
        {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }
    async login(loginForm: LoginRequest): Promise<string> {
        try {
            let found = await this.userRepository.findOne({
                where: {
                    password: loginForm.password,
                    email: loginForm.email
                },
                relations: ['role']
            });
            let payload = {
                id: found.id,
                roleId: found.role.id,
                role: found.role.name,
                email: found.email,
            }

            const jwt = this.jwtService.signAsync(payload);
            return jwt;
        }
        catch (e)
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
    }
}
