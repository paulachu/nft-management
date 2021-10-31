import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWriteStream } from 'fs';
import { NftModel } from 'src/models/nft.models';
import { NftStatus } from 'src/models/nft.status.enum';
import { SellsModel } from 'src/models/sells.models';
import { TeamModel } from 'src/models/team.models';
import { UserModel } from 'src/models/user.models';
import { getManager, getRepository } from 'typeorm';
import { BestSellerResponse } from './dto/best.seller.response';
import { CreateNftRequest } from './dto/create.nft.request';
import { RateNftRequest } from './dto/rate.nft.request';
import { SellNftRequest } from './dto/sell.nft.request';
@Injectable()
export class NftService {
    private readonly logger = new Logger(NftService.name);
    private readonly dir = './nfts';

    constructor(@InjectRepository(TeamModel) private teamRepository = getRepository(TeamModel),
        @InjectRepository(UserModel) private userRepository = getRepository(UserModel),
        @InjectRepository(SellsModel) private sellsRepository = getRepository(SellsModel),
        @InjectRepository(NftModel) private nftRepository = getRepository(NftModel),
        ) {
            const fs = require("fs")
            if (!fs.existsSync(this.dir)){
                fs.mkdirSync(this.dir);
            }
        }

    async createNft(file: Express.Multer.File, createNftRequest: CreateNftRequest, user: any): Promise<NftModel>
    {
        const foundUser = await this.userRepository.findOne({ where: {id: user.id}});
        this.logger.log(file)
        let splitFilename = file.originalname.split('.');
        const path = this.dir + '/' + createNftRequest.name + '.' + splitFilename[splitFilename.length - 1]
        const ws = createWriteStream(path)
        ws.write(file.buffer)
        let res = await this.nftRepository.save({
            owner: foundUser,
            price: createNftRequest.price,
            name: createNftRequest.name,
            status: createNftRequest.status,
            pathImage: path
        });
        delete res.owner.password;
        return res;
    }
    async rateNft(rateNftRequest: RateNftRequest, user: any): Promise<NftModel>
    {
        let nftFound = await this.nftRepository.findOne({where: {id: rateNftRequest.nftId}, relations: ['owner', 'owner.team']});
        if (!nftFound)
        {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        }
        const userTeam = await this.userRepository.findOne({ where: {id: user.id}, relations: ['team']});
        if (userTeam.team && nftFound.owner.team.id == userTeam.team.id)
        {
            throw new HttpException('You can not rate a nft owned by your team', HttpStatus.FORBIDDEN);
        }
        nftFound.rate = (nftFound.rate * +nftFound.nbOfVotes + +rateNftRequest.rate) / (+nftFound.nbOfVotes + 1);
        nftFound.nbOfVotes++;
        nftFound = await this.nftRepository.save(nftFound);
        this.logger.log(new Date().getTime() + ": " + user.id + " gives " + rateNftRequest.rate + " stars to " + nftFound.name);
        return nftFound;
    }
    async sell(sellNftRequest: SellNftRequest, user: any): Promise<SellsModel> {
        const userFound = await this.userRepository.findOne( {where: {id: user.id}, relations: ['team']});
        const foundNft = await this.nftRepository.findOne({where: {id: sellNftRequest.nftId}, relations: ['sells', 'sells.seller', 'owner', 'owner.team']});
        if (!foundNft || !userFound.team)
        {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
        if (userFound.team.balance < foundNft.price)
        {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
        const teamSeller = foundNft.owner.team;
        const date = new Date();
        this.logger.log(date.getTime() +  ': ' + userFound.id + " bought the nft " + foundNft.name + ' to ' + foundNft.owner.id);
        const sellResult = await this.sellsRepository.save({
            seller: foundNft.owner,
            buyer: userFound,
            nft: foundNft,
            date: date
        });
        if (userFound.team.id != teamSeller.id) {
            userFound.team.balance -= +foundNft.price;
            teamSeller.balance += +foundNft.price;
            await this.teamRepository.save(userFound.team);
            await this.teamRepository.save(teamSeller);
        }
        delete sellResult.buyer.password;
        delete sellResult.seller.password;
        return sellResult;
    }

    async mostRatedNft(user: any, limit?: number, offset?: number): Promise<NftModel[]> {
        let mostRated = await this.nftRepository.find({
            take: 10,
            order: {
                rate: 'DESC'
            }
        });
        mostRated = mostRated.slice(offset || 0, (+offset || 0 ) + (+limit || mostRated.length));
        this.logger.log(new Date().getTime() + ": " + user.id + " requested the most rated nft, returning " + mostRated.length + " NFTs");
        return mostRated;
    }

    async lastXSells(user: any, limit?: number, offset?: number): Promise<SellsModel[]> {
        let foundXSells = await this.sellsRepository.find({
            take: 10,
            order: {
                date: 'DESC'
            },
            relations: ['nft', 'buyer', 'seller']
        });
        foundXSells.forEach(sells =>
            {
                delete sells.buyer;
            });
        foundXSells.forEach(sells => delete sells.buyer.password)
        foundXSells = foundXSells.slice(offset || 0, (+offset || 0 ) + (+limit || foundXSells.length));
        this.logger.log(new Date().getTime() + ": " + user.id + " requested the last " + 10 + " sells, returning " + foundXSells.length + " sells");
        return foundXSells;
    }

    async ownSells(user: any, limit?: number, offset?: number): Promise<SellsModel[]> {
        let foundOwnSells = (await this.sellsRepository.find({
            where: { seller: {id: user.id}},
            relations: ['nft', 'buyer'],
        }));
        foundOwnSells.forEach(sells => delete sells.buyer.password)
        foundOwnSells = foundOwnSells.slice(offset || 0, (+offset || 0 ) + (+limit || foundOwnSells.length));
        this.logger.log(new Date().getTime() + ": " + user.id + " requested his own sells, returning " + foundOwnSells.length + " sells");
        return foundOwnSells;
    }
    async bestSellersTeams(user: any, limit?: number, offset?: number): Promise<BestSellerResponse[]>
    {
        const manager = getManager();
        let resQuery = await manager.query(` SELECT count(*) as "nbOfSells", teams.name FROM teams JOIN users on teams."id" = users."teamId" JOIN sells ON users.id = "sellerId"  GROUP BY teams.name ORDER BY "nbOfSells" DESC` );
        resQuery = resQuery.slice(offset || 0, (+offset || 0 ) + (+limit || resQuery.length));
        this.logger.log(new Date().getTime() + ": " + user.id + " requested the best sellers teams, returning " + resQuery.length + " teams");
        return resQuery;
    }
}
