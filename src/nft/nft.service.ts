/* eslint-disable @typescript-eslint/no-array-constructor */
/* eslint-disable prettier/prettier */
import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { NFTModel } from 'src/database/models/nft.model';
import { nftProviders } from 'src/database/providers/nft.providers';
import { NFT_REPOSITORY, SELLS_REPOSITORY, TEAM_REPOSITORY, USER_REPOSITORY } from '../common/constants';
import { CreateNftRequest } from './dto/create.nft.request';
import { RateNftRequest } from './dto/rate.nft.request';
import { UserModel } from 'src/database/models/user.model';
import { SellsModel } from 'src/database/models/sells.model';
import { SellNftRequest } from './dto/sell.nft.request';
import { TeamModel } from 'src/database/models/team.model';
@Injectable()
export class NftService {
    constructor(@Inject(NFT_REPOSITORY) private readonly nftRepository: typeof NFTModel,
            @Inject(SELLS_REPOSITORY) private readonly sellsRepository: typeof SellsModel,
            @Inject(TEAM_REPOSITORY) private readonly teamRepository: typeof TeamModel,
            @Inject(USER_REPOSITORY) private readonly userRepository: typeof UserModel) {}
    
    async createNft(createNftRequest: CreateNftRequest, user: any): Promise<NFTModel>
    {
        return null;
    }
    async rateNft(rateNftRequest: RateNftRequest, user: any): Promise<NFTModel>
    {
        const foundNft: NFTModel = await this.nftRepository.findOne({where: {id: rateNftRequest.nftId}, include: [{model: UserModel}]});
        if (!foundNft && foundNft.ownersHistory && foundNft.ownersHistory.length != 0 && foundNft.ownersHistory[foundNft.ownersHistory.length - 1].teamId == user.teamId)
        {
            throw new HttpException('You can not rate a nft owned by your team', HttpStatus.FORBIDDEN);
        }
        foundNft.rate = (foundNft.rate * foundNft.nbOfVotes + rateNftRequest.rate) / foundNft.nbOfVotes + 1;
        foundNft.nbOfVotes++;
        foundNft.save();
        console.log(new Date().getTime() + ": " + user.id + " gives " + rateNftRequest.rate + " stars to " + foundNft.name);
        return foundNft;
    }
    async sell(sellNftRequest: SellNftRequest, user: any): Promise<SellsModel> {
        const foundNft = await this.nftRepository.findOne({where: {id: sellNftRequest.nftId}, include: [{model: UserModel}]});
        if (!foundNft)
        {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
        const teamBuyer = await this.teamRepository.findOne({where: { id: user.teamId}});
        if (!teamBuyer || teamBuyer.balance < foundNft.price)
        {
            throw new HttpException("Bad Request", HttpStatus.BAD_REQUEST);
        }
        const seller = foundNft.ownersHistory[foundNft.ownersHistory.length - 1];
        const teamSeller = await this.teamRepository.findOne({where: { id: seller.teamId}});
        const date = new Date().getTime();
        console.log(date +  ': ' + user.id + " bought the nft " + foundNft.name + ' to ' + seller.id);
        const buyer = await this.userRepository.findOne({where: {id: user.id}});
        const sellResult = await this.sellsRepository.create({
            seller: seller,
            buyer: buyer,
            date: date
        });
        teamBuyer.balance -= +foundNft.price;
        teamSeller.balance += +foundNft.price;
        await teamSeller.save();
        await teamBuyer.save();
        await foundNft.$add('ownersHistory', buyer);
        return sellResult;
    }
    

    async mostRatedNft(user: any): Promise<NFTModel[]> {
        const mostRated: NFTModel[] = await this.nftRepository.findAll({
            limit: 3,
            order: [['rate', 'DESC']]
        });
        
        console.log(new Date().getTime() + ": " + user.id + " requested the most rated nft, returning " + mostRated);
        return mostRated;
    }

    async lastXSells(user: any, lastXSells: number): Promise<SellsModel[]> {
        const foundXSells = await this.sellsRepository.findAll({
            limit: lastXSells,
            order: [['date', 'DESC']]
        });

        console.log(new Date().getTime() + ": " + user.id + " requested the last " + lastXSells + " sells, returning " + foundXSells);
        return foundXSells;
    }
    

    async ownSells(user: any): Promise<SellsModel[]> {
        const foundOwnSells  = await this.sellsRepository.findAll({
            where: { seller: {id: user.id}}
        });
        console.log(new Date().getTime() + ": " + user.id + " requested his own sells, returning " + foundOwnSells);
        return foundOwnSells;
    }

    async bestSellersTeams(user: any): Promise<TeamModel[]> {
        const sells = await this.sellsRepository.findAll({include: [{model: UserModel}]});
        const array = new Array();
        for (const sell of sells)
        {
            const found = array.find(elm => elm['teamId'] == sell.seller.teamId);
            if (found)
            {
                found['count']++;
            }
            else
            {
                array.push({teamId: sell.seller.teamId, count: 1});
            }
        }
        array.sort(function(a, b) {
            return b['count'] - a['count'];
        });
        const res = new Array<TeamModel>();
        for (const elm of array)
        {
            res.push(await this.teamRepository.findOne({where: {id: elm.teamId}}));
        }

        console.log(new Date().getTime() + ": " + user.id + " requested the best sellers teams, returning " + res);
        return res;
    }
}
