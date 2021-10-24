/* eslint-disable prettier/prettier */
import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { DatabaseConfig } from "./database.config";
import { RoleModel } from "./models/role.model";
import { TeamModel } from "./models/team.model";
import { UserModel } from "./models/user.model";
import { SellsModel } from "./models/sells.model";
import { NFTModel } from "./models/nft.model";
import { CollectionModel } from './models/collection.model';

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        let databaseConfig = DatabaseConfig.getConfig(configService);
        const sequelize = new Sequelize(databaseConfig);
        //const sequelize = new Sequelize('sqlite::memory:');
        sequelize.addModels([UserModel, TeamModel, RoleModel, NFTModel, SellsModel, CollectionModel]);
        await sequelize.sync({force: true});
        const adminRole = new RoleModel({id: 1, name: 'admin'});
        adminRole.save();
        const userRole = new RoleModel({id: 2, name: 'user'});
        userRole.save();
        const adminUser = new UserModel({
            email: 'test@nft.fr',
            password: 'admin',
            roleId: 1,
            name: 'test',
            blockChainAddress: '0xba3c9BA4a7C10b904Bb7ad7FDCB0d2CF9681BcA1'
        });
        /*let nft = new NFTModel({
          name: 'test',
          image: 'fileTest',
          price: 5.0,
          status: 2,
          rate: 2
        })*/
        
        await adminUser.save();
        /*await nft.save();
        await nft.$add('ownersHitory', await UserModel.findOne({ where: {email: 'test@nft.fr'}}))
        
        let test_nft = await NFTModel.findOne({ where: {name: 'test'}, include: [{model: UserModel}]})
        console.log(test_nft.ownersHitory[0])*/
        return sequelize;
      },
    },
  ];