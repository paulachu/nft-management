import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionModel } from 'src/models/collection.models';
import { NftModel } from 'src/models/nft.models';
import { RoleModel } from 'src/models/role.models';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { AddMemberRequest } from 'src/team/dto/add.member.request';
import { CreateTeamRequest } from 'src/team/dto/create.team.request';
import { ToppedRequest } from 'src/team/dto/topped.request';
import { TeamService } from 'src/team/team.service';
import { getRepository } from 'typeorm';
import { FeedDatabase } from './database.feed';
import { DatabaseModuleTest } from './database.test.module';


describe('TeamService', () => {
  let service: TeamService;
  let feedDatabase = new FeedDatabase();
  afterAll(async () =>
  {
    await feedDatabase.clear();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModuleTest, TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel]), JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
        })],
      providers: [TeamService],
    }).compile();
    service = module.get<TeamService>(TeamService);
    await feedDatabase.feed();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('createTeam admin user', () => {
    let teamToCreate = new CreateTeamRequest();
    teamToCreate.name = 'teamAdmin';
    let user = {
      id: feedDatabase.adminUser.id,
      roleId: 1,
      role: 'admin',
      email: feedDatabase.adminUser.email,
    };

    return service.createTeam(teamToCreate, user).then(async data => {
      expect(data.name).toBe('teamAdmin');
    });
  });

  test('createTeam basic user', () => {
    let teamToCreate = new CreateTeamRequest();
    teamToCreate.name = 'teamUser';
    let user = {
      id: feedDatabase.basicUser.id,
      roleId: 2,
      role: 'user',
      email: feedDatabase.basicUser.email,
    };

    return service.createTeam(teamToCreate, user).then(data => {
      expect(data.name).toBe('teamUser');
    });
  });

  test('addMember admin user', () => {
    let memberToAdd = new AddMemberRequest();
    memberToAdd.teamId = 1;
    memberToAdd.memberEmail = feedDatabase.basicUser3.email;
    let user = {
      id: feedDatabase.adminUser.id,
      roleId: 1,
      role: 'admin',
      email: feedDatabase.adminUser.email,
    };
    return service.addMember(memberToAdd, user).then(data => {
      expect(data.name).toBe('teamAdmin');
    });
  });

  test('addMember basic user', () => {
    let memberToAdd = new AddMemberRequest();
    memberToAdd.teamId = 1;
    memberToAdd.memberEmail = feedDatabase.basicUser2.email;
    let user = {
      id: feedDatabase.basicUser.id,
      roleId: 2,
      role: 'user',
      email: feedDatabase.basicUser.email,
    };
    return service.addMember(memberToAdd, user).then(data => {
      expect(data.name).toBe('teamUser');
    });
  });

  test('topUpBalance', () => {
    let toppedRequestDto = new ToppedRequest();
    toppedRequestDto.teamId = 1;
    toppedRequestDto.topUpAmount = 1;
    
    let user = {
      id: feedDatabase.adminUser.id,
      roleId: 1,
      role: 'admin',
      email: feedDatabase.adminUser.email,
    };

    return service.topUpBalance(toppedRequestDto, user).then(data => {
      expect(data.name).toBe('teamAdmin')
    })
  });

  test('getTeam', () => {
    return service.getTeam(feedDatabase.basicUser2).then(data => {
      expect(data.name).toBe('teamUser')
    })
  });
});
