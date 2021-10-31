import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from 'src/collection/collection.service';
import { CollectionModel } from 'src/models/collection.models';
import { NftModel } from 'src/models/nft.models';
import { RoleModel } from 'src/models/role.models';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { FeedDatabase } from './database.feed';
import { DatabaseModuleTest } from './database.test.module';

describe('CollectionService', () => {
  let service: CollectionService;
  let feedDatabase: FeedDatabase = new FeedDatabase();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModuleTest, TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel]), JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
        })],
      providers: [CollectionService],
    }).compile();
    service = module.get<CollectionService>(CollectionService);
    await feedDatabase.feed();
  });
  afterAll(async () => {
    await feedDatabase.clear();
  })
  test('create collection', () => {

  })
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
