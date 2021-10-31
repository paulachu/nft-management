import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NftModel } from 'src/models/nft.models';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserModel, NftModel, SellsModel, TeamModel])],
    providers: [NftService],
    controllers: [NftController]
})
export class NftModule {}