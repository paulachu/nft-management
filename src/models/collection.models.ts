import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CollectionStatus } from "./collection.status.enum";
import { NftModel } from "./nft.models";
import { TeamModel } from "./team.models";

@Entity('collections')
export class CollectionModel {
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
    pathLogo: string;

    @Column({
        type: "date",
        nullable: true
    })
    autoArchiving: Date;

    @Column({
        type: "enum",
        enum: CollectionStatus,
        nullable: false
    })
    status: CollectionStatus;

    @OneToMany(type => NftModel, nft => nft.collection)
    nfts: NftModel[];
    @ManyToOne(type => TeamModel, team => team.collections)
    team: TeamModel;
}