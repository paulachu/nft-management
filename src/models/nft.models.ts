import { IsNotEmpty, Min } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { CollectionModel } from "./collection.models";
import { NftStatus } from "./nft.status.enum";
import { SellsModel } from "./sells.models";
import { UserModel } from "./user.models";

@Entity('nfts')
export class NftModel {
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
        nullable: true
    })
    pathImage: string;

    @Column({
        type: "float",
        nullable: false,
    })
    @Min(0)
    price: number;

    @Column({
        type: "enum",
        enum: NftStatus,
        nullable: false
    })
    status: NftStatus;

    @ManyToOne(type => CollectionModel, collection => collection.nfts)
    collection: CollectionModel;

    @OneToMany(type => SellsModel, sells => sells.nft)
    sells: SellsModel[];

    @ManyToOne(type => UserModel, user => user.nfts, { nullable: false})
    owner: UserModel;

    @Column({
        type: "float",
        nullable: false,
        default: 0
    })
    rate: number;

    @Column({
        type: "integer",
        nullable: false,
        default: 0
    })
    nbOfVotes: number;
}