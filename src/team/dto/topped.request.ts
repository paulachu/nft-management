import { ApiProperty } from "@nestjs/swagger";

export class ToppedRequest {
    @ApiProperty({
        description: "Amount to top up"
    })
    topUpAmount: number;
    @ApiProperty({
        description: "Team id"
    })
    teamId: number;
}