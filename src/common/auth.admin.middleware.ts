import { HttpException, HttpStatus, Inject, NestMiddleware } from "@nestjs/common";

import {JwtService} from "@nestjs/jwt";
import { AuthService } from "src/auth/auth.service";
export class AuthAdminMiddleware implements NestMiddleware
{
    @Inject()
    private jwtService: JwtService;
    @Inject()
    private authService: AuthService
    async use(req: any, res: any, next: () => void) {
        let header = req.headers['authorization'];
        if (header != null)
        {
            try {
                header = header.split('Bearer ')[1];
                const data = this.jwtService.verify(header);
                let valid = await this.authService.validateAdmin(data);
                if (valid)
                {
                    req.user = data;
                    next();
                }
                else
                {
                    throw new HttpException('Invalid User', HttpStatus.FORBIDDEN);
                }
            }
            // FIXME catch malformed jwt
            catch(e)
            {
                throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
            }
        }
        else
        {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}