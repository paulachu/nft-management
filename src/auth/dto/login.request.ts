import { ApiProperty } from "@nestjs/swagger";

export class LoginRequest {
    @ApiProperty({
        description: "Name of the user"
    })
    password: string;
    @ApiProperty({
        description: "Password of the user"
    })
    email: string;
}