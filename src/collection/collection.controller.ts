import { Body, Controller, Get, Inject, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CollectionModel } from 'src/models/collection.models';
import { imageFileFilter } from 'src/nft/nft.controller';
import { CollectionService } from './collection.service';
import { AddNftToCollectionRequest } from './dto/add.nft.to.collection.request';
import { CreateCollectionRequest } from './dto/create.collection.request';
import { GetCollectionResponse } from './dto/get.collections.dto';

@Controller('collection')
@ApiTags('Collection')
export class CollectionController {
    @Inject()
    private collectionService: CollectionService;
    @Post()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Create a new collection'})
    @ApiResponse({ status: 201, description: 'The collection created', type: CollectionModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file',
        { fileFilter: imageFileFilter }
        ))
    async createCollections(@Req() req: any, @Body() createCollectionRequest: CreateCollectionRequest, @UploadedFile() file: Express.Multer.File): Promise<CollectionModel>
    {
        return await this.collectionService.createCollections(req.user, createCollectionRequest, file);
    }
    @Put()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Add a nft to a collection'})
    @ApiResponse({ status: 201, description: 'The collection which contains the nft', type: CollectionModel})
    @ApiResponse({ status: 404, description: 'Not found'})
    async addNftToCollection(@Req() req: any, @Body() addNftToCollection: AddNftToCollectionRequest): Promise<CollectionModel>
    {
        return await this.collectionService.addNftToCollection(req.user, addNftToCollection)
    }
    @Get()
    @ApiBearerAuth('access-token')
    @ApiOperation({ summary: 'Get collections'})
    @ApiResponse({ status: 200, description: 'The collections visible for this user', type: [GetCollectionResponse]})
    @ApiResponse({ status: 404, description: 'Not found'})
    @ApiQuery({ name: 'limit', description: 'Limit of the result length', required: false})
    @ApiQuery({ name: 'offset', description: 'Offset of the result', required: false })
    async getCollection(@Req() req: any, limit?: number, offset?: number): Promise<GetCollectionResponse[]>
    {
        return await this.collectionService.getCollection(req.user, limit, offset);
    }
}
