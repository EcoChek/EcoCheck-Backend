import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OpenFoodFactsService {
  constructor(private readonly httpService: HttpService) {}

  async fetchProduct(barcode: string) {
    console.log(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);

    const response = await firstValueFrom(
      this.httpService.get(
        `https://world.openfoodfacts.net/api/v2/product/${barcode}`
      )
    );

    return {
      grade: response.data['product']['ecoscore_data']['grade']
    };
  }
}
