import { IsNotEmpty } from "class-validator";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CollectionModel } from "./collection.models";
import { UserModel } from "./user.models";

@Entity('teams')
export class TeamModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        type: "varchar",
        nullable: false
    })
    @IsNotEmpty()
    name: string;
    @Column({
        type: "float",
        default: 0,
    })
    balance: number;

    @OneToMany(type => UserModel, users => users.team)
    users: UserModel[];

    @OneToMany(type => CollectionModel, collection => collection.team)
    collections: CollectionModel[]
}