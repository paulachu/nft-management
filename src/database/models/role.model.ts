/* eslint-disable prettier/prettier */
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table
export class RoleModel extends Model {
    @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
        validate: {
            notEmpty: true
        }
    })
    name: string;

    @HasMany(() => UserModel)
    users: UserModel[];
}