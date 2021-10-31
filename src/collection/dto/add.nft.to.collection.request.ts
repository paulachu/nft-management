import { ApiProperty } from "@nestjs/swagger";

export class AddNftToCollectionRequest {
    @ApiProperty({
        description: "Id of collection"
    })
    collectionId: number;
    @ApiProperty({
        description: "Id of nft",
    })
    NftId: number;
}