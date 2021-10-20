import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { roleProviders } from 'src/data/providers/role.providers';
import { usersProviders } from 'src/data/providers/user.providers';
import { AuthService } from 'src/services/auth/auth.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    providers: [AuthService,
        ...usersProviders, ...roleProviders],
    controllers: [AuthController]
})
export class AuthModule {}
