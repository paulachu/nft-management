import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModel } from 'src/models/role.models';
import { UserModel } from 'src/models/user.models';
import { NftModel } from 'src/models/nft.models';
import { CollectionModel } from 'src/models/collection.models';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, RoleModel, NftModel, CollectionModel])],
  providers: [CollectionService],
  controllers: [CollectionController]
})
export class CollectionModule {}
