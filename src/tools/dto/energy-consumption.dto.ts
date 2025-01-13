import {
  IsArray,
  IsIn,
  IsString,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class DeviceDto {
  @IsString()
  name: string;

  @IsIn(['a', 'b', 'c', 'd', 'e', 'f'])
  grade: string;

  @Min(0)
  @Max(24)
  hours: number;
}

export class EnergyConsumptionDto {
  devices: any;
}
