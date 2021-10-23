import { Module } from '@nestjs/common';
import { roleProviders } from "src/database/providers/role.providers";
import { usersProviders } from "src/database/providers/user.providers";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";


@Module({
    providers: [AuthService,
        ...usersProviders, ...roleProviders],
    controllers: [AuthController]
})
export class AuthModule {}
