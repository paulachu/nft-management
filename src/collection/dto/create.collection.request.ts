import { ApiProperty } from "@nestjs/swagger";
import { CollectionStatus } from "src/models/collection.status.enum";

export class CreateCollectionRequest {
    @ApiProperty({
        description: "Name of collection"
    })
    name: string;
    @ApiProperty({
        description: "Date of archiving",
        required: false
    })
    autoArchiving?: Date;
    @ApiProperty({
        description: "Logo of collection"
    })
    file: any;
    @ApiProperty({
        description: "Status of collection"
    })
    status: CollectionStatus;
}