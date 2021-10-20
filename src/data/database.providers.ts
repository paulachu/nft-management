import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { DatabaseConfig } from "./database.config";
import { RoleModel } from "./models/role.model";
import { TeamModel } from "./models/team.model";
import { UserModel } from "./models/user.model";

export const databaseProviders = [
    {
      provide: 'SEQUELIZE',
      useFactory: async (configService: ConfigService) => {
        let databaseConfig = DatabaseConfig.getConfig(configService);
        const sequelize = new Sequelize(databaseConfig);
        sequelize.addModels([UserModel, TeamModel, RoleModel]);
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
        })
        adminUser.save();
        return sequelize;
      },
    },
  ];