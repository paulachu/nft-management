import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";

@Table
export class TeamModel extends Model {
    @Column({
        allowNull: false,
        type: DataType.STRING,
        validate: {
            notEmpty: true
        }
    })
    name: string;

    @Column({
        allowNull: false,
        type: DataType.FLOAT,
        defaultValue: 0
    })
    balance: number;

    @HasMany(() => UserModel)
    members: UserModel[];
}