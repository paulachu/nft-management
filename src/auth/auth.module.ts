import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { roleProviders } from "src/database/providers/role.providers";
import { usersProviders } from "src/database/providers/user.providers";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import {JwtModule} from "@nestjs/jwt";
import { AuthAdminMiddleware } from 'src/common/auth.admin.middleware';
import { AuthMiddleware } from 'src/common/auth.middleware';


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
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer)
    {
      consumer.apply(AuthMiddleware).forRoutes('/auth/test');
      //consumer.apply(AuthAdminMiddleware).forRoutes('/auth/register');
    }
}
