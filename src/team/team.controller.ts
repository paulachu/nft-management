import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthFunction } from 'src/common/auth.functions';
import { TeamModel } from 'src/database/models/team.model';
import { AddMemberRequest } from './dto/add.member.request';
import { CreateTeamRequest } from './dto/create.team.request';
import { ToppedRequest } from './dto/topped.request';
import { TeamService } from './team.service';

@Controller('team')
@ApiTags('Team')
export class TeamController {
    constructor(private teamService: TeamService) {}
    @Get()
    public async getTeam(@Req() req: any): Promise<TeamModel> {
        return this.teamService.getTeam(req.user.teamId);
    }
    @Post('/topped')
    public async toppedBalance(@Body() toppedRequestDto: ToppedRequest): Promise<TeamModel> {
        return this.teamService.topUpBalance(toppedRequestDto);
    }
    @Post('/create')
    public async createTeam(@Req() req: any, @Body() createTeamRequestDto: CreateTeamRequest): Promise<TeamModel> {
        if (AuthFunction.isAdmin(req.user))
        {
            return this.teamService.createTeamAdmin(createTeamRequestDto);
        }
        return this.teamService.createTeam(createTeamRequestDto, req.user.id);
    }
    @Put('/addmember')
    public async addMember(@Req() req: any, @Body() addMemberRequestDto: AddMemberRequest): Promise<TeamModel> {
        if (AuthFunction.isAdmin(req.user))
        {
            return this.teamService.addMemberAdmin(addMemberRequestDto)
        }
        return this.teamService.addMember(addMemberRequestDto, req.user.teamId);
    }
}