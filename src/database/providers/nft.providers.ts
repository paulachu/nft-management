/* eslint-disable prettier/prettier */
import { NFT_REPOSITORY } from "src/common/constants";
import { NFTModel } from "../models/nft.model";

export const nftProviders = [
    {
        provide: NFT_REPOSITORY,
        useValue: NFTModel
    }
]