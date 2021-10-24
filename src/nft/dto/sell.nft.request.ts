import { ApiProperty } from "@nestjs/swagger";
export class SellNftRequest {
    @ApiProperty({
        description: "Id of NFT"
    })
    nftId: number;
}