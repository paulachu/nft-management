import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { RoleModel } from './models/role.models';
import { TeamModel } from './models/team.models';
import { UserModel } from './models/user.models';
import { TeamModule } from './team/team.module';
import { AuthMiddleware } from './common/auth.middleware';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CollectionModel } from './models/collection.models';
import { SellsModel } from './models/sells.models';
import { NftModel } from './models/nft.models';
import { NftModule } from './nft/nft.module';
import { DatabaseProvider } from './database.provider';
import { CollectionModule } from './collection/collection.module';
import { CollectionController } from './collection/collection.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "postgres",
      username: "postgres",
      password: "postgres",
      port: 5432,
      database: "nft",
      synchronize: true,
      dropSchema: true,
      entities: [UserModel, RoleModel, TeamModel, CollectionModel, SellsModel, NftModel]
    }),
    TypeOrmModule.forFeature([UserModel, RoleModel, TeamModel, CollectionModel, NftModel, SellsModel]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
      }),
    AuthModule,
    TeamModule,
    NftModule,
    CollectionModule,
  ],
  controllers: [],
  providers: [AuthService, DatabaseProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer)
  {
    consumer.apply(AuthMiddleware).forRoutes('team*');
    consumer.apply(AuthMiddleware).forRoutes('nft*');
    consumer.apply(AuthMiddleware).forRoutes('collection*');
  }
}
