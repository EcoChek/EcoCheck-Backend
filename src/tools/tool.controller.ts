import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ImageDto } from './dto/image.dto';
import { EnergyConsumptionDto } from './dto/energy-consumption.dto';

@Controller()
export class ToolController {
  constructor(private readonly openFoodFactsService: ToolsService) {}

  @Post('image')
  image(@Body() body: ImageDto) {
    return this.openFoodFactsService.estimateEmissions(body.file);
  }

  @Get('barcode/:barcode')
  test(@Param('barcode') barcode: string) {
    return this.openFoodFactsService.getProductScore(barcode);
  }

  @Post('energy-consumption')
  energyConsumption(@Body() energyConsumptionDto: EnergyConsumptionDto) {
    return this.openFoodFactsService.getEnergyConsumption(energyConsumptionDto);
  }
}
