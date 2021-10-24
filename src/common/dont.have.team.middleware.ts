import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { AuthFunction } from "./auth.functions";

export class DontHaveTeamMiddlewareOrIsAdmin implements NestMiddleware
{
    use(req: any, res: any, next: () => void) {
        console.log(req)
        if (req.user != undefined && (!req.user.teamId || AuthFunction.isAdmin(req.user)))
        {
            next();
        }
        else{
            throw new HttpException('Bad Requests', HttpStatus.BAD_REQUEST);
        }
    }
}