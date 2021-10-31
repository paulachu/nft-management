import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserModel } from 'src/models/user.models';
import { AuthService } from './auth.service';
import { CreateUserRequest } from './dto/create.user.request';
import { LoginRequest } from './dto/login.request';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/register')
    @ApiOperation({ summary: 'Create a new user'})
    @ApiResponse({ status: 200, description: 'User created', type: UserModel})
    @ApiResponse({ status: 400, description: 'Bad Request'})
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
    @ApiOperation({ summary: 'Login'})
    @ApiResponse({ status: 200, description: 'Jwt obtained for the user', type: String})
    @ApiResponse({ status: 400, description: 'Bad Request'})
    public async login(@Body() loginForm: LoginRequest): Promise<string> {
        let secretKey = await this.authService.login(loginForm);
        if (secretKey != null){
            return secretKey;
        }
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
}
