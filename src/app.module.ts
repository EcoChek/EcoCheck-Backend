import { Module } from '@nestjs/common';
import { OpenFoodFactsService } from './open-food-facts/open-food-facts.service';
import { HttpModule } from '@nestjs/axios';
import { TestController } from './test/test.controller';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from './guards/auth.guard';
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
  providers: [
    OpenFoodFactsService,
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard
    }
  ]
})
export class AppModule {}
