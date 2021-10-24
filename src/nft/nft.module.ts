/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { sellsProviders } from 'src/database/providers/sells.providers';
import { nftProviders } from 'src/database/providers/nft.providers';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { AuthMiddleware } from 'src/common/auth.middleware';
import { NestModule } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { roleProviders } from 'src/database/providers/role.providers';
import { usersProviders } from 'src/database/providers/user.providers';
import { teamProviders } from 'src/database/providers/team.providers';
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        JwtModule.register({
        secret: 'secret',
        signOptions: {expiresIn: '1d'}
      })],
    providers: [NftService, ...teamProviders, ...roleProviders, ...usersProviders, AuthService, ...nftProviders, ...sellsProviders],
    controllers: [NftController]
})
export class NftModule implements NestModule {
    configure(consumer: MiddlewareConsumer)
    {
        consumer.apply(AuthMiddleware).forRoutes('/nft/*');
    }
}
