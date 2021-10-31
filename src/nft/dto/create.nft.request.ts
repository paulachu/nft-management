import { ApiProperty } from "@nestjs/swagger";
import { NftStatus } from "src/models/nft.status.enum";

export class CreateNftRequest{
    @ApiProperty({
        description: "Name of NFT"
    })
    name: string;
    @ApiProperty({
        description: "Price of NFT"
    })
    price: number;
    @ApiProperty({
        description: "Price of NFT",
        type: "enum",
        enum: NftStatus
    })
    status: NftStatus;
    @ApiProperty({
        description: "file",
        type: "file",
    })
    file: any;
}