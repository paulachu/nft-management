import { ApiProperty } from "@nestjs/swagger";

export class BestSellerResponse {
    @ApiProperty({
        description: "Number of team sells"
    })
    nbOfSells: string;
    @ApiProperty({
        description: "Name of team"
    })
    name: string;
}