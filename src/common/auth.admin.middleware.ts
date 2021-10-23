import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { SECRET_KEY_ADMIN } from "src/common/constants";

export class AuthAdminMiddleware implements NestMiddleware
{
    use(req: any, res: any, next: () => void) {
        if (req.headers['authorization'] === SECRET_KEY_ADMIN)
        {
            next();
        }
        else
        {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }
}