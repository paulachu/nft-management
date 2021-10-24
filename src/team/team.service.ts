import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRequest } from 'src/auth/dto/create.user.request';
import { TEAM_REPOSITORY, USER_REPOSITORY } from 'src/common/constants';
import { TeamModel } from 'src/database/models/team.model';
import { UserModel } from 'src/database/models/user.model';
import { AddMemberRequest } from './dto/add.member.request';
import { CreateTeamRequest } from './dto/create.team.request';
import { ToppedRequest } from './dto/topped.request';

@Injectable()
export class TeamService {
    constructor(@Inject(TEAM_REPOSITORY) private readonly teamRepository: typeof TeamModel, @Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel) {}
    async createTeamAdmin(createTeamRequestDto: CreateTeamRequest): Promise<TeamModel> {
        return await this.teamRepository.create({
            name: createTeamRequestDto.name
        });
    }
    async createTeam(createTeamRequestDto: CreateTeamRequest, userId: number): Promise<TeamModel> {
        let team = await this.teamRepository.create({
            name: createTeamRequestDto.name
        });
        team.$add('members', await this.userRepository.findOne({where: {id: userId}}))
        return team;
    }
    async addMemberAdmin(addMemberRequestDto: AddMemberRequest): Promise<TeamModel> {
        let team = await this.teamRepository.findOne( {where: {
            id: addMemberRequestDto.teamId
        }});
        team.$add('members', await this.userRepository.findOne({where: {email: addMemberRequestDto.memberEmail}}))
        return team;;
    }
    async addMember(addMemberRequestDto: AddMemberRequest, teamId: number): Promise<TeamModel> {
        let team = await this.teamRepository.findOne( {where: {
            id: teamId
        }});
        team.$add('members', await this.userRepository.findOne({where: {email: addMemberRequestDto.memberEmail}}))
        return team;;
    }
    async topUpBalance(toppedRequestDto: ToppedRequest): Promise<TeamModel> {
        return this.teamRepository.findOne( {where: {
            id: toppedRequestDto.teamId
        }}).then((team) => {
            team.balance += +toppedRequestDto.topUpAmount;
            return team.save()});
    }
    async getTeam(teamId: number): Promise<TeamModel> {
        return this.teamRepository.findOne({ where: { id: teamId }, include: [{model: UserModel}]});
    }
}
