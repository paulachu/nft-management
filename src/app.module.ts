import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AuthAdminMiddleware } from './common/auth.admin.middleware';
import { AuthMiddleware } from './common/auth.middleware';
import { DatabaseModule } from './database/database.module';
import { TeamModule } from './team/team.module';
import { NftController } from './nft/nft.controller';
import { NftService } from './nft/nft.service';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, DatabaseModule, TeamModule, NftModule],
  providers: [],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer)
  {
    //consumer.apply(AuthMiddleware).forRoutes('*');
    //consumer.apply(AuthAdminMiddleware).forRoutes('*');
  }
}