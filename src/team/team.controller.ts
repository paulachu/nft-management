import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeamModel } from 'src/models/team.models';
import { AddMemberRequest } from './dto/add.member.request';
import { CreateTeamRequest } from './dto/create.team.request';
import { ToppedRequest } from './dto/topped.request';
import { TeamService } from './team.service';

@Controller('team')
@ApiTags('Team')
export class TeamController {
    constructor(private teamService: TeamService) {}
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get own team'})
    @ApiResponse({ status: 200, description: 'Team of the current user', type: TeamModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    public async getTeam(@Req() req: any): Promise<TeamModel> {
        return this.teamService.getTeam(req.user);
    }
    @Post('/topped')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Topped up a team'})
    @ApiResponse({ status: 201, description: 'Team which has been topped up', type: TeamModel})
    @ApiResponse({ status: 403, description: 'Forbidden'})
    public async toppedBalance(@Req() req: any, @Body() toppedRequestDto: ToppedRequest): Promise<TeamModel> {
        return this.teamService.topUpBalance(toppedRequestDto, req.user);
    }
    @Post('/create')
    @ApiOperation({ summary: 'Create a team'})
    @ApiResponse({ status: 201, description: 'Team which has been created', type: TeamModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiBearerAuth('access-token')
    public async createTeam(@Req() req: any, @Body() createTeamRequestDto: CreateTeamRequest): Promise<TeamModel> {
        return await this.teamService.createTeam(createTeamRequestDto, req.user);
    }
    @Put('/addmember')
    @ApiOperation({ summary: 'Add a member to a team'})
    @ApiResponse({ status: 200, description: 'Team with has been update', type: TeamModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    public async addMember(@Req() req: any, @Body() addMemberRequestDto: AddMemberRequest): Promise<TeamModel> {
        return this.teamService.addMember(addMemberRequestDto, req.user);
    }
}
