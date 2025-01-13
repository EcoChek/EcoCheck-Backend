import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import envConfig from '../../env.config';
import { EnergyConsumptionDto } from './dto/energy-consumption.dto';
import { CarConsumptionDto } from './dto/car-consumption.dto';

@Injectable()
export class ToolsService {
  constructor(private readonly httpService: HttpService) {
    this.googleGenerativeAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);
  }

  private googleGenerativeAI: GoogleGenerativeAI;

  async getProductScore(barcode: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://world.openfoodfacts.net/api/v2/product/${barcode}`
      )
    );

    const model = this.googleGenerativeAI.getGenerativeModel({
      model: 'models/gemini-2.0-flash-exp',
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const resp = await model.generateContent([
      `Give an estimation of the carbon footprint this object would give in kg of co2: ${response.data['product']['product_name']}. If you're not sure, put 0 rather than nothing
        
        Object: {emissions: number}
        Return Object`
    ]);

    return {
      greenScore: response.data['product']['ecoscore_data']['grade'],
      name: response.data['product']['product_name'],
      imageURL: response.data['product']['image_url'] ?? '',
      emissions: +JSON.parse(resp.response.text())['emissions'],
      quantity: +response.data['product']['product_quantity'],
      unit: response.data['product']['product_quantity_unit']
    };
  }

  gradeMultiplier = {
    A: 1.0,
    B: 1.2,
    C: 1.5,
    D: 1.8,
    E: 2.0,
    F: 2.5
  };

  getEnergyConsumption(energyConsumptionDto: EnergyConsumptionDto) {
    let totalEnergy = 0;

    const devices = [];

    energyConsumptionDto.devices.forEach(({ grade, name, hours }) => {
      const { power_max } = energyConsumptionData.find(
        (el) => el.plug_name === name
      );

      const adjustedPower = power_max * this.gradeMultiplier[grade];

      const power = (adjustedPower / 1000) * hours;

      devices.push({
        name,
        power
      });

      totalEnergy += power;
    });

    return {
      totalEnergy,
      devices
    };
  }

  async estimateEmissions(file: string) {
    const model = this.googleGenerativeAI.getGenerativeModel({
      model: 'models/gemini-2.0-flash-exp',
      generationConfig: {
        responseMimeType: 'application/json'
      }
    });

    const prompt = `Give an estimation of the name, carbon emissions (kg of CO2), type and weight, unit of measure (g) of the object in the picture using this schema:

Object = {'name': string, 'carbonEmission': number, 'type': 'trash' | 'paper' | 'cardboard' | 'plastic' | 'metal' | 'glass', weight: number, unit: string}
Return: Object`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: file,
          mimeType: 'image/jpeg'
        }
      },
      prompt
    ]);

    const resp = JSON.parse(result.response.text());

    if (Array.isArray(resp)) {
      return resp[0];
    }

    return resp;
  }

  getCarConsumption(carConsumptionDto: CarConsumptionDto) {
    let emissionsPerKm = 0;

    switch (carConsumptionDto.engine) {
      case 'diesel':
        emissionsPerKm = 0.12;
        break;
      case 'petrol':
        emissionsPerKm = 0.14;
        break;
      case 'electric':
        emissionsPerKm = 0;
        break;
      case 'hybrid':
        emissionsPerKm = 0.08;
        break;
      default:
        throw new Error('Invalid engine type');
    }

    return {
      emissions: carConsumptionDto.kilometers * emissionsPerKm
    };
  }
}
