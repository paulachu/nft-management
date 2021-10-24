import { ApiProperty } from "@nestjs/swagger";

export class AddMemberRequest {
    @ApiProperty({
        description: "Email of the user to add"
    })
    memberEmail: string;
    @ApiProperty({
        description: "Team id if user is admin",
        required: false
    })
    teamId: number;
}