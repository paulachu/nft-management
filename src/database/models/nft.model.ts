/* eslint-disable prettier/prettier */
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { CollectionModel } from './collection.model';
import { UserModel } from './user.model';
import { SellsModel } from './sells.model';
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
    unique: false,
    validate: {
      notEmpty: true,
    },
  })
  image: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: false,
    validate: {
      notEmpty: true,
    },
  })
  price: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: false,
    validate: {
      notEmpty: true,
    },
  })
  status: number;

  @ForeignKey(() => UserModel)
  @HasMany(() => UserModel)
  ownersHistory: UserModel[];

  @ForeignKey(() => CollectionModel)
  @Column({
    allowNull: true,
    type: DataType.STRING,
    validate: {
      notEmpty: false,
    },
  })
  collectionName: string;

  @Column({
    allowNull: false,
    type: DataType.FLOAT,
    unique: false,
    validate: {
      notEmpty: true,
    },
  })
  rate: number;
  @ForeignKey(() => SellsModel)
  sells: SellsModel[];

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    unique: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  })
  nbOfVotes: number;
}
