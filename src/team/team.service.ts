import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamModel } from '../models/team.models';
import { UserModel } from '../models/user.models';
import { getRepository } from 'typeorm';
import { AddMemberRequest } from './dto/add.member.request';
import { CreateTeamRequest } from './dto/create.team.request';
import { ToppedRequest } from './dto/topped.request';

@Injectable()
export class TeamService {
    constructor(@InjectRepository(TeamModel) private teamRepository = getRepository(TeamModel),
        @InjectRepository(UserModel) private userRepository = getRepository(UserModel)) {}

    async createTeam(createTeamRequestDto: CreateTeamRequest, user: any): Promise<TeamModel> {
        if (user.role === 'admin')
        {
            return await this.teamRepository.save({
                name: createTeamRequestDto.name
            });
        }
        let userFound = await this.userRepository.findOne({where: {id: user.id}, relations: ['team']});
        if (!userFound || userFound.team)
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        let team = await this.teamRepository.save({
            name: createTeamRequestDto.name
        });
        if (!team.users)
        {
            team.users = new Array();
        }
        team.users.push(userFound);
        if (team.users)
        {
            team.users.forEach(user => delete user.password);
        }
        return await this.teamRepository.save(team);
    }

    //NEED TO BE TESTED
    async addMember(addMemberRequestDto: AddMemberRequest, user: any): Promise<TeamModel> {
        if (user.role == 'admin')
        {
            let team = await this.teamRepository.findOne( {where: {
                id: addMemberRequestDto.teamId
            }, relations: ['users']});
            let userFound = await this.userRepository.findOne({where: {email: addMemberRequestDto.memberEmail}, relations: ['team']});
            if (!team || !userFound || userFound.team)
            {
                throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
            }
            if (!team.users)
            {
                team.users = new Array();
            }
            team.users.push(userFound);
            return await this.teamRepository.save(team);
        }
        let team = (await this.userRepository.findOne({where: {id: user.id}, relations: ['team']})).team;
        let userFound = await this.userRepository.findOne({where: {email: addMemberRequestDto.memberEmail}, relations: ['team']});
        if (!team || !userFound || userFound.team)
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        if (!team.users)
        {
            team.users = new Array();
        }
        team.users.push(userFound);
        team.users.forEach(user => delete user.password);
        return await this.teamRepository.save(team);
    }
    async topUpBalance(toppedRequestDto: ToppedRequest, user: any): Promise<TeamModel> {
        if (user.role != 'admin')
        {
            throw new HttpException('You cant top because you are not admin', HttpStatus.FORBIDDEN);
        }
        let team = await this.teamRepository.findOne( {where: {
            id: toppedRequestDto.teamId
        }})
        team.balance += +toppedRequestDto.topUpAmount;
        return await this.teamRepository.save(team);
    }
    async getTeam(user: any): Promise<TeamModel> {
        let userFound = await this.userRepository.findOne({ where: { id: user.id }, relations: ['team', 'team.users']});
        if (!userFound.team)
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        if (userFound.team.users)
        {
            userFound.team.users.forEach(user => delete user.password);
        }
        return userFound.team;
    }
}
