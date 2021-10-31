import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionModel } from 'src/models/collection.models';
import { NftModel } from 'src/models/nft.models';
import { RoleModel } from 'src/models/role.models';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { NftService } from 'src/nft/nft.service';
import { DatabaseModuleTest } from './database.test.module';

describe('NftService', () => {
  let service: NftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModuleTest, TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel])],
      providers: [NftService],
    }).compile();

    service = module.get<NftService>(NftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
