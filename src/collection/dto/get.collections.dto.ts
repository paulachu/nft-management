import { ApiProperty } from "@nestjs/swagger";
import { CollectionStatus } from "src/models/collection.status.enum";

export class GetCollectionResponse {
    @ApiProperty({
        description: "Id of collection"
    })
    id: number;
    @ApiProperty({
        description: "Name of collection"
    })
    name: string;
    @ApiProperty({
        description: "Date of archiving"
    })
    dateOfArchive?: Date;
    @ApiProperty({
        description: "Rate of collection"
    })
    rate: number;
    @ApiProperty({
        description: "Path of the logo of collection"
    })
    logoPath: string;
    @ApiProperty({
        description: "Status of collection"
    })
    status: CollectionStatus;
}