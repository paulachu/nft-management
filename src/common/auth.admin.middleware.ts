import { HttpException, HttpStatus, Inject, NestMiddleware } from "@nestjs/common";
import { ROLE_REPOSITORY, SECRET_KEY_ADMIN, USER_REPOSITORY } from "src/common/constants";
import { RoleModel } from "src/database/models/role.model";
import { UserModel } from "src/database/models/user.model";

export class AuthAdminMiddleware implements NestMiddleware
{
    constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof RoleModel) {}
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