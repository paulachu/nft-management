import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NftModel } from "./nft.models";
import { UserModel } from "./user.models";

@Entity('sells')
export class SellsModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "timestamp",
        nullable: false
    })
    date: Date;

    @ManyToOne(type => UserModel, user => user.sells)
    seller: UserModel;

    @ManyToOne(type => UserModel, user => user.sells)
    buyer: UserModel;

    @ManyToOne(type => NftModel, nft => nft.sells)
    nft: NftModel;
}