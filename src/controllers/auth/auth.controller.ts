import { Controller, Get } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService)
    {}
    @Get()
    public async test(): Promise<string> {
        let user = await this.authService.createUser();
        return user.name;
    }
}
