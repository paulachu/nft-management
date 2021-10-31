import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'graceful-fs';
import { CollectionModel } from 'src/models/collection.models';
import { CollectionStatus } from 'src/models/collection.status.enum';
import { NftModel } from 'src/models/nft.models';
import { UserModel } from 'src/models/user.models';
import { getRepository } from 'typeorm';
import { AddNftToCollectionRequest } from './dto/add.nft.to.collection.request';
import { CreateCollectionRequest } from './dto/create.collection.request';
import { GetCollectionResponse } from './dto/get.collections.dto';

@Injectable()
export class CollectionService {
    private readonly logger = new Logger(CollectionService.name);
    private dir = './collections';
    constructor(@InjectRepository(NftModel) private nftRepository = getRepository(NftModel),
                @InjectRepository(CollectionModel) private collectionRepository = getRepository(CollectionModel),
                @InjectRepository(UserModel) private userRepository = getRepository(UserModel)) {
                    const fs = require("fs")
            if (!fs.existsSync(this.dir)){
                fs.mkdirSync(this.dir);
            }
    }

    async addNftToCollection(user: any, addNftToCollection: AddNftToCollectionRequest): Promise<CollectionModel> {
        var foundCollection = await this.collectionRepository.findOne({ where: {id: addNftToCollection.collectionId }});
        if (!foundCollection) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        var foundNft = await this.nftRepository.findOne({ where: {id: addNftToCollection.NftId}});
        if (!foundNft) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        if (!foundCollection.nfts) {
            foundCollection.nfts = new Array();
        }
        foundCollection.nfts.push(foundNft);
        this.collectionRepository.save(foundCollection);
        this.logger.log(new Date().getTime() + ': ' + user.id + ' add the nft with id ' + addNftToCollection.NftId
                    + ' to the collection with id ' + addNftToCollection.collectionId);
        return foundCollection;
    }
    async createCollections(user: any, createCollectionRequest: CreateCollectionRequest, file: Express.Multer.File): Promise<CollectionModel>
    {
        var userFound = await this.userRepository.findOne({where: {id: user.id}, relations: ['team']});
        let splitFilename = file.originalname.split('.');
        const path = this.dir + '/' + createCollectionRequest.name + '.' + splitFilename[splitFilename.length - 1];
        const ws = createWriteStream(path);
        ws.write(file.buffer);
        let res = await this.collectionRepository.save({
            name: createCollectionRequest.name,
            pathLogo: createCollectionRequest.file,
            autoArchiving: createCollectionRequest.autoArchiving,
            status: createCollectionRequest.status,
            nfts: [],
            team: userFound.team
        });
        this.logger.log(new Date().getTime() + ': ' + user.id + ' created a new collection named ' + createCollectionRequest.name);
        return res;
    }
    async getCollection(user: any, limit?: number, offset?: number): Promise<GetCollectionResponse[]>
    {
        var foundCollections: CollectionModel[] = await this.collectionRepository.find({relations: ['nfts', 'team']});
        var collectionsList: GetCollectionResponse[] = [];
        var userFound = await this.userRepository.findOne({where: {id: user.id}, relations: ['team']});
        foundCollections.forEach(c => {
            if ((c.status != CollectionStatus.Published && userFound.team && userFound.team.id == c.team.id) || c.status == CollectionStatus.Published)
            {
                let rate = 0;
                if (c.nfts && c.nfts.length != 0) {
                    c.nfts.forEach(nft => { rate += nft.rate});
                    rate /= c.nfts.length;
                }
                collectionsList.push(
                    {
                        id: c.id, name: c.name, dateOfArchive: c.autoArchiving, rate: rate, logoPath: c.pathLogo, status: c.status
                    });
            }
        })
        collectionsList = collectionsList.slice(offset || 0, (+offset || 0 ) + (+limit || collectionsList.length));
        return collectionsList;
    }
}
