import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { RoleModel } from "./role.model";
import { TeamModel } from "./team.model";

@Table
export class UserModel extends Model {
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
        type: DataType.STRING,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    })
    email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        validate: {
            notEmpty: true,
            is: /^0x[a-fA-F0-9]{40}$/
        }
    })
    blockChainAddress: string;


    @Column({
        allowNull: false,
        type: DataType.STRING,
        validate: {
            notEmpty: true
        }
    })
    password: string;

    @ForeignKey(() => TeamModel)
    @Column({
        allowNull: true,
        type: DataType.BIGINT,
        validate: {
            notEmpty: true
        }
    })
    teamId: number

    @BelongsTo(() => TeamModel)
    team: TeamModel;

    @ForeignKey(() => RoleModel)
    @Column({
        allowNull: false,
        type: DataType.BIGINT,
        validate: {
            notEmpty: true
        }
    })
    roleId: number

    @BelongsTo(() => RoleModel)
    role: RoleModel;
}