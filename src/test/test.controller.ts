import { Body, Controller, Get, Param } from '@nestjs/common';
import { ToolsService } from '../tools/tools.service';
import { ImageDto } from './dto/image.dto';
import { EnergyConsumptionDto } from './dto/energy-consumption.dto';

@Controller('test')
export class TestController {
  constructor(private readonly openFoodFactsService: ToolsService) {}

  @Get('image')
  image(@Body() body: ImageDto) {
    return this.openFoodFactsService.estimateEmissions(body.file);
  }

  @Get(':barcode')
  test(@Param('barcode') barcode: string) {
    return this.openFoodFactsService.getProductScore(barcode);
  }

  @Get('energy-consumption')
  energyConsumption(@Body() energyConsumptionDto: EnergyConsumptionDto) {
    return this.openFoodFactsService.getEnergyConsumption(energyConsumptionDto);
  }
}
