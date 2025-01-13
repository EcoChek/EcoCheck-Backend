import { Module } from '@nestjs/common';
import { ToolsService } from './tools/tools.service';
import { HttpModule } from '@nestjs/axios';
import { TestController } from './test/test.controller';

@Module({
  imports: [HttpModule],
  controllers: [TestController],
  providers: [ToolsService]
})
export class AppModule {}
