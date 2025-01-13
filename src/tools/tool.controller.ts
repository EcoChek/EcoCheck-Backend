import { Body, Controller, Post } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ImageDto } from './dto/image.dto';
import { EnergyConsumptionDto } from './dto/energy-consumption.dto';
import { BarcodeDto } from './dto/barcode.dto';
import { CarConsumptionDto } from './dto/car-consumption.dto';

@Controller()
export class ToolController {
  constructor(private readonly openFoodFactsService: ToolsService) {}

  @Post('image')
  image(@Body() body: ImageDto) {
    return this.openFoodFactsService.estimateEmissions(body.file);
  }

  @Post('barcode')
  test(@Body() barcodeDto: BarcodeDto) {
    return this.openFoodFactsService.getProductScore(barcodeDto.barcode);
  }

  @Post('energy-consumption')
  energyConsumption(@Body() energyConsumptionDto: EnergyConsumptionDto) {
    return this.openFoodFactsService.getEnergyConsumption(energyConsumptionDto);
  }

  @Post('car-emission')
  carConsumption(@Body() carConsumptionDto: CarConsumptionDto) {
    return this.openFoodFactsService.getCarConsumption(carConsumptionDto);
  }
}
