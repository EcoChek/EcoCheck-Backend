import { Module } from '@nestjs/common';
import { ToolsService } from './tools/tools.service';
import { HttpModule } from '@nestjs/axios';
import { TestController } from './test/test.controller';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { LocalStorageModule } from './config/local-storage.module';
import { AppRoutesModule } from './config/app-routes.module';

@Module({
  imports: [
    HttpModule,
    AuthModule,
    DatabaseModule,
    LocalStorageModule,
    AppRoutesModule
  ],
  controllers: [TestController],
  providers: [ToolsService]
})
export class AppModule {}
