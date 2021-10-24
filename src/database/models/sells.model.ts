/* eslint-disable prettier/prettier */

import { Table, Model, Column, DataType, HasMany, HasOne } from "sequelize-typescript";
import { DateDataType } from "sequelize/types";
import { NFTModel } from "./nft.model";
import { UserModel } from "./user.model";

@Table
export class SellsModel extends Model {

    @Column({
    allowNull: false,
    type: DataType.DATE,
    unique: false,
        validate: {
            notEmpty: true
        }
    })
    date: Date;

    @HasOne(() => UserModel)
    buyer: UserModel;

    @HasOne(() => UserModel)
    seller: UserModel;

    @HasOne(() => NFTModel)
    nft: NFTModel;
}