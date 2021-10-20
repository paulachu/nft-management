import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, DatabaseModule],
  providers: [],
})
export class AppModule {}