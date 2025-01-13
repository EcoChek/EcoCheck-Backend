import { Module } from '@nestjs/common';
import { ToolsService } from './tools/tools.service';
import { HttpModule } from '@nestjs/axios';
import { ToolController } from './tools/tool.controller';

@Module({
  imports: [HttpModule],
  controllers: [ToolController],
  providers: [ToolsService]
})
export class AppModule {}
