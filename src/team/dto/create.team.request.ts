import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamRequest {
    @ApiProperty({
        description: "Name of the team to create"
    })
    name: string;
}