/* eslint-disable prettier/prettier */
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { NFTModel } from "./nft.model";

@Table
export class CollectionModel extends Model {
    @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
        validate: {
            notEmpty: true
        }
    })
    name: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
        unique: true,
            validate: {
                notEmpty: false
            }
        })
        logo: string;

        @Column({
            allowNull: false,
            type: DataType.INTEGER,
            unique: true,
                validate: {
                    notEmpty: true
                }
            })
            status: number;

            @Column({
                allowNull: true,
                type: DataType.TIME,
                unique: true,
                    validate: {
                        notEmpty: false
                    }
                })
                autoArchivingTime: Date;

    @HasMany(() => NFTModel)
    nfts: NFTModel[];
}