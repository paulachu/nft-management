import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthAdminMiddleware } from './common/auth.admin.middleware';
import { AuthMiddleware } from './common/auth.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, DatabaseModule],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer)
  {
    //consumer.apply(AuthMiddleware).forRoutes('*');
    //consumer.apply(AuthAdminMiddleware).forRoutes('*');
  }
}