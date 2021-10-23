import { Body, Controller, Get, HttpStatus, Post, Res, HttpException, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserModel } from 'src/database/models/user.model';
import { CreateUserRequest } from 'src/auth/dto/create.user.request';
import { LoginRequest } from 'src/auth/dto/login.request';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    public async register(@Body() userToCreate: CreateUserRequest): Promise<UserModel> {

        try {
            let user = await this.authService.createUser(userToCreate);
            return user;
        }
        catch (e) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginForm: LoginRequest): Promise<string> {
        let secretKey = await this.authService.login(loginForm);
        if (secretKey != null){
            return secretKey;
        }
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
}
