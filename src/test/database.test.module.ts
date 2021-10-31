import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectionModel } from "src/models/collection.models";
import { NftModel } from "src/models/nft.models";
import { RoleModel } from "src/models/role.models";
import { SellsModel } from "src/models/sells.models";
import { TeamModel } from "src/models/team.models";
import { UserModel } from "src/models/user.models";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: "postgrestest",
            username: "postgres",
            password: "postgres",
            port: 5432,
            database: "nfttest",
            synchronize: false,
            keepConnectionAlive: true,
            entities: [UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel]
        }),
        JwtModule.register({
            secret: 'secret',
            signOptions: {expiresIn: '1d'}
        }),
        TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel])],
    providers: []
})
export class DatabaseModuleTest
{
}