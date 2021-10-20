import { Body, Controller, Get, HttpStatus, Post, Res, HttpException, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserModel } from 'src/data/models/user.model';
import { CreateUserRequest } from 'src/dto/auth/create.user.request';
import { LoginRequest } from 'src/dto/auth/login.request';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    public async register(@Body() userToCreate: CreateUserRequest): Promise<UserModel> {

        try {
            let user = await this.authService.createUser(userToCreate);
            console.log(user)
            return user;
        }
        catch (e) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    public async login(@Body() loginForm: LoginRequest): Promise<number> {
        if (await this.authService.login(loginForm))
        {
            return new Date().getTime();
        }
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
}
