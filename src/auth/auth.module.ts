import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/common/auth.middleware';
import { RoleModel } from 'src/models/role.models';
import { UserModel } from 'src/models/user.models';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, RoleModel]),
    JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
    })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {
}
