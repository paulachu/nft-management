import { HttpException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserRequest } from 'src/auth/dto/create.user.request';
import { LoginRequest } from 'src/auth/dto/login.request';
import { DatabaseProvider } from 'src/database.provider';
import { CollectionModel } from 'src/models/collection.models';
import { NftModel } from 'src/models/nft.models';
import { RoleModel } from 'src/models/role.models';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { getRepository, In } from 'typeorm';
import { FeedDatabase } from './database.feed';
import { DatabaseModuleTest } from './database.test.module';
describe('AuthService', () => {
  let service: AuthService;
  let user: UserModel;
  let userLogin: UserModel;
  let feedDatabase: FeedDatabase = new FeedDatabase();
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModuleTest, TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel]), JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
        })],
      providers: [AuthService],
    }).compile();


    service = module.get<AuthService>(AuthService);
    await feedDatabase.feed();
  })

  test('create user', async () => {
    let userToCreate = new CreateUserRequest();
    userToCreate.email = "dedede@de.fr";
    userToCreate.blockChainAddress = "0xba3c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA1";
    userToCreate.name = "testUser3";
    user = await service.createUser(userToCreate);
    expect(user.name).toBe("testUser3"); 
  })
  test('create user failed', async () => {
    let userToCreate = new CreateUserRequest();
    userToCreate.email = "";
    userToCreate.blockChainAddress = "d2CF9681BcA1";
    userToCreate.name = "testUser2";
    try {
      let createdUser = await service.createUser(userToCreate);
      expect(true).toBe(false);
    }
    catch(err)
    {
      expect(err).toBeInstanceOf(HttpException); 
    }
  })


  test('create user and login', async () => {
    let userToCreate = new CreateUserRequest();
    userToCreate.email = "test@login.fr";
    userToCreate.blockChainAddress = "0xba3e9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA1";
    userToCreate.name = "testUser";
    userLogin = await service.createUser(userToCreate);
    let loginRequest = new LoginRequest();
    loginRequest.email = "test@login.fr"
    loginRequest.password = userLogin.password;
    let jwt = await service.login(loginRequest)
    expect(jwt.length).toBeGreaterThan(1);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  afterAll(async () =>
  {
    await feedDatabase.clear();
  })
});
