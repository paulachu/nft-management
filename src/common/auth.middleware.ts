import { HttpException, HttpStatus, Inject, NestMiddleware } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from '@nestjs/jwt';

export class AuthMiddleware implements NestMiddleware
{
    @Inject()
    private jwtService: JwtService;
    @Inject()
    private authService: AuthService;
    async use(req: any, res: any, next: () => void) {
        let header = req.headers['authorization'];
        if (header != null)
        {
            header = header.split('Bearer ')[1];
            const data = await this.jwtService.verifyAsync(header);
            let valid = await this.authService.validateUser(data);
            if (valid)
            {
                req.user = data;
                console.log(data)
                next();
            }
            else
            {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }
        }
        else
        {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}