import { Module } from '@nestjs/common';
import { roleProviders } from "src/database/providers/role.providers";
import { usersProviders } from "src/database/providers/user.providers";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {JwtModule} from "@nestjs/jwt";


@Module({
    imports: [
        JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
    })],
    providers: [AuthService,
        ...usersProviders, ...roleProviders],
    controllers: [AuthController]
})
export class AuthModule {}
