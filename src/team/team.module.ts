import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModel } from 'src/models/role.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel])],
    providers: [TeamService],
    controllers: [TeamController]
})
export class TeamModule {}
