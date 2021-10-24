import { ApiProperty } from "@nestjs/swagger";
export class RateNftRequest {
    @ApiProperty({
        description: "Id of NFT"
    })
    nftId: number;
    
    @ApiProperty({
        description: "Rate of the user"
    })
    rate: number;
}