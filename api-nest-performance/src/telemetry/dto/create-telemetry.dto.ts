import { IsString, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateTelemetryDto {
  @IsString()
  @IsNotEmpty()
  sensorId: string;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsString()
  @IsNotEmpty()
  unit: string;
}