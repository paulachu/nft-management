import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Column, Entity, Exclusion, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NftModel } from "./nft.models";
import { RoleModel } from "./role.models";
import { SellsModel } from "./sells.models";
import { TeamModel } from "./team.models";

@Entity('users')
export class UserModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "varchar",
        nullable: false
    })
    @IsNotEmpty()
    name: string;
    @Column({
        type: "varchar",
        nullable: false,
        unique: true
    })
    @IsEmail({}, { message: 'Incorrect email'})
    email: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    @Matches(/^0x[a-fA-F0-9]{40}$/)
    blockChainAddress: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    @IsNotEmpty()
    password: string;

    @ManyToOne(type => TeamModel, team => team.users)
    team: TeamModel;

    @ManyToOne(type => RoleModel, role => role.users, { nullable: false })
    role: RoleModel;

    @OneToMany(type => SellsModel, sell => sell.seller)
    sells: SellsModel[];

    @OneToMany(type => SellsModel, sell => sell.buyer)
    purchases: SellsModel[];
    @OneToMany(type => NftModel, nft => nft.owner)
    nfts: NftModel[];
}