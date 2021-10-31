import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Query, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createWriteStream } from 'graceful-fs';
import { NftModel } from 'src/models/nft.models';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { BestSellerResponse } from './dto/best.seller.response';
import { CreateNftRequest } from './dto/create.nft.request';
import { RateNftRequest } from './dto/rate.nft.request';
import { SellNftRequest } from './dto/sell.nft.request';
import { NftService } from './nft.service';
export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new HttpException('Only image files are allowed', HttpStatus.BAD_REQUEST));
    }
    callback(null, true);
  };
  
@Controller('nft')
@ApiTags('NFT')
export class NftController {
    @Inject()
    private nftService: NftService;
    @Post()
    @ApiOperation({ summary: 'Create a new nft'})
    @ApiResponse({ status: 201, description: 'The created nft', type: NftModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiBearerAuth('access-token')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',
        { fileFilter: imageFileFilter }
        ))
    public async createNft(@Req() req: any, @Body() createNftRequest: CreateNftRequest, @UploadedFile() file: Express.Multer.File): Promise<NftModel>
    {
        return this.nftService.createNft(file, createNftRequest, req.user);
    }
    @Post('/sell')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Buy a nft'})
    @ApiResponse({ status: 201, description: 'The sells model returned for the nft', type: SellsModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    public async sell(@Req() req: any, @Body() sellNftRequest: SellNftRequest): Promise<SellsModel> {
        return this.nftService.sell(sellNftRequest, req.user);
    }

    @Post('/rate')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Rate a nft'})
    @ApiResponse({ status: 201, description: 'The nft which has been rate', type: NftModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    public async rateNft(@Req() req: any, @Body() rateNftRequest: RateNftRequest): Promise<NftModel> {
        return this.nftService.rateNft(rateNftRequest, req.user);
    }

    @Get('/most-rated')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get most rated nfts'})
    @ApiResponse({ status: 200, description: 'List of most rated nfts.', type: [NftModel]})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiQuery({ name: 'limit', description: 'Limit of the result length', required: false})
    @ApiQuery({ name: 'offset', description: 'Offset of the result', required: false })
    public async mostRatedNft(@Req() req: any, @Query('limit') limit?: number, @Query('offset') offset?: number): Promise<NftModel[]>{
        return this.nftService.mostRatedNft(req.user, limit, offset);
    }

    @Get('/last-x-sells')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get last sold nfts'})
    @ApiResponse({ status: 200, description: 'List of last sold nfts.', type: [NftModel]})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiQuery({ name: 'limit', description: 'Limit of the result length', required: false})
    @ApiQuery({ name: 'offset', description: 'Offset of the result', required: false })
    public async lastXSells(@Req() req: any, @Query('limit') limit?: number, @Query('offset') offset?: number) {
        return this.nftService.lastXSells(req.user, limit, offset);
    }

    @Get('/own-sells')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get own sold nfts'})
    @ApiResponse({ status: 200, description: 'List of own sells.', type: [SellsModel]})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiQuery({ name: 'limit', description: 'Limit of the result length', required: false})
    @ApiQuery({ name: 'offset', description: 'Offset of the result', required: false })
    public async ownSells(@Req() req: any, @Query('limit') limit?: number, @Query('offset') offset?: number): Promise<SellsModel[]> {
        return this.nftService.ownSells(req.user, limit, offset);
    }
    @Get('/best-seller-teams')
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get best seller teams'})
    @ApiResponse({ status: 200, description: 'List of best seller teams.', type: [BestSellerResponse]})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiQuery({ name: 'limit', description: 'Limit of the result length', required: false})
    @ApiQuery({ name: 'offset', description: 'Offset of the result', required: false })
    @ApiResponse({ status: 201, type: [BestSellerResponse], description: 'Creates new user object.' })
    public async bestSellersTeams(@Req() req: any, @Query('limit') limit?: number, @Query('offset') offset?: number): Promise<BestSellerResponse[]> {
        return this.nftService.bestSellersTeams(req.user, limit, offset);
    }

}
