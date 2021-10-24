/* eslint-disable prettier/prettier */

import { Controller, Post, Req, Body, Get } from '@nestjs/common';
import { NFTModel } from 'src/database/models/nft.model';
import { SellsModel } from 'src/database/models/sells.model';
import { ApiTags } from '@nestjs/swagger';
import { RateNftRequest } from './dto/rate.nft.request';
import { Inject } from '@nestjs/common';
import { NftService } from './nft.service';
import { CreateNftRequest } from './dto/create.nft.request';
import { LastXSellsRequest } from './dto/last.x.sells.request';
import { SellNftRequest } from './dto/sell.nft.request';
import { TeamModel } from 'src/database/models/team.model';
@Controller('nft')
@ApiTags('NFT')
export class NftController {

    @Inject()
    private nftService: NftService;
    @Post()
    public async createNft(@Req() req: any, @Body() createNftRequest: CreateNftRequest): Promise<NFTModel>
    {
        return this.nftService.createNft(createNftRequest, req.user);
    }
    @Post('/sell')
    public async sell(@Req() req: any, @Body() sellNftRequest: SellNftRequest): Promise<SellsModel> {
        return null
    }

    @Post('/rate')
    public async rateNft(@Req() req: any, @Body() rateNftRequest: RateNftRequest): Promise<NFTModel> {
        return this.nftService.rateNft(rateNftRequest, req.user);
    }

    @Get('/most-rated')
    public async mostRatedNft(@Req() req: any) {
        return this.nftService.mostRatedNft(req.user);
    }

    @Get('/last-x-sells')
    public async lastXSells(@Req() req: any, @Body() lastXSellsRequest: LastXSellsRequest) {
        return this.nftService.lastXSells(req.user, lastXSellsRequest.lastXSells);
    }

    @Get('/own-sells')
    public async ownSells(@Req() req: any): Promise<SellsModel[]> {
        return this.nftService.ownSells(req.user);
    }
    @Get('/best-seller-teams')
    public async bestSellersTeams(@Req() req: any): Promise<TeamModel[]> {
        return this.nftService.bestSellersTeams(req.user);
    }
}