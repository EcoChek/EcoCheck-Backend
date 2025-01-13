import { IsIn, IsNumber, IsString } from 'class-validator';

export class CarConsumptionDto {
  @IsNumber()
  kilometers: number;

  @IsIn(['diesel', 'petrol', 'electric', 'hybrid'])
  @IsString()
  engine: 'diesel' | 'petrol' | 'electric' | 'hybrid';
}
