import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequest {
    @ApiProperty({
        description: "Name of the user"
    })
    name: string;

    @ApiProperty({
        description: "email of the user"
    })
    email: string;

    @ApiProperty({
        description: "blockChainAddress of the user"
    })
    blockChainAddress: string;
}