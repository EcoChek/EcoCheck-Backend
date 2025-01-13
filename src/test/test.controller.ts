import { Controller, Get, Param } from '@nestjs/common';
import { OpenFoodFactsService } from '../open-food-facts/open-food-facts.service';

@Controller('test')
export class TestController {
  constructor(private readonly openFoodFactsService: OpenFoodFactsService) {
  }

  @Get(':barcode')
  test(@Param('barcode') barcode: string) {
    return this.openFoodFactsService.fetchProduct(barcode);
  }
}
