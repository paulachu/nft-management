import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { SECRET_KEY_USER } from "src/common/constants";

export class AuthMiddleware implements NestMiddleware
{
    use(req: any, res: any, next: () => void) {
        if (req.headers['authorization'] === SECRET_KEY_USER)
        {
            next();
        }
        else
        {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}