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

  @IsIn(['A', 'B', 'C', 'D', 'E', 'F'])
  grade: string;

  @Min(0)
  @Max(24)
  hours: number;
}

export class EnergyConsumptionDto {
  @IsArray({
    each: true
  })
  @Type(() => DeviceDto)
  @ValidateNested()
  devices: DeviceDto[];
}
