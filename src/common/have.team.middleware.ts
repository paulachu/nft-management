import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { AuthFunction } from "./auth.functions";

export class HaveTeamMiddlewareOrIsAdmin implements NestMiddleware
{
    use(req: any, res: any, next: () => void) {
        if (req.user != undefined && (req.user.teamId || AuthFunction.isAdmin(req.user)))
        {
            next();
        }
        throw new HttpException('Bad Requestss', HttpStatus.BAD_REQUEST);
    }
}