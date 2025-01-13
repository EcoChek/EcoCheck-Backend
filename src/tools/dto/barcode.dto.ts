import { IsString } from 'class-validator';

export class BarcodeDto {
  @IsString()
  barcode: string;
}
