import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.models";

@Entity('roles')
export class RoleModel {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        nullable: false,
        unique: true
    })
    @IsNotEmpty()
    name: string;

    @OneToMany(type => UserModel, users => users.role)
    users: UserModel[];
}