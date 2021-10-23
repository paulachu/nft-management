/* eslint-disable prettier/prettier */
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { CollectionModel } from './collection.model';

@Table
export class NFTModel extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  image: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  status: number;

  @Column({
    allowNull: false,
    type: DataType.TEXT,
    unique: true,
    validate: {
      notEmpty: true,
    },
  })
  OwnersHistory: string;

  @ForeignKey(() => CollectionModel)
  @Column
  @Column({
    allowNull: false,
    type: DataType.STRING,
    validate: {
      notEmpty: true,
    },
  })
  collectionName: string;

  @BelongsTo(() => CollectionModel)
  collection: CollectionModel;
}
