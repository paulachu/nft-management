import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthAdminMiddleware } from 'src/common/auth.admin.middleware';
import { AuthMiddleware } from 'src/common/auth.middleware';
import { DontHaveTeamMiddlewareOrIsAdmin } from 'src/common/dont.have.team.middleware';
import { HaveTeamMiddlewareOrIsAdmin } from 'src/common/have.team.middleware';
import { roleProviders } from 'src/database/providers/role.providers';
import { teamProviders } from 'src/database/providers/team.providers';
import { usersProviders } from 'src/database/providers/user.providers';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
  imports: [
    JwtModule.register({
    secret: 'secret',
    signOptions: {expiresIn: '1d'}
  })],
  providers: [TeamService, ...teamProviders, ...roleProviders, ...usersProviders, AuthService],
  controllers: [TeamController]
})
export class TeamModule implements NestModule {
    configure(consumer: MiddlewareConsumer)
    {
      consumer.apply(AuthMiddleware).exclude({path: '/team/topped', method: RequestMethod.POST})
        .forRoutes('/team')
      consumer.apply(AuthAdminMiddleware).forRoutes({path: '/team/topped', method: RequestMethod.POST})
      consumer.apply(DontHaveTeamMiddlewareOrIsAdmin).forRoutes(
        { path: '/team/create', method: RequestMethod.POST });
      consumer.apply(HaveTeamMiddlewareOrIsAdmin).forRoutes(
        { path: '/team/addmember', method: RequestMethod.POST });
    }
}
