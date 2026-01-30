import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';

@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly telemetryService: TelemetryService) {}

  // Lista registros de um sensor específico
  @Get('sensor/:sensorId')
  async getBySensor(@Param('sensorId') sensorId: string) {
    return this.telemetryService.findBySensor(sensorId);
  }

  // Calcula a média diretamente no banco de dados para alta performance
  @Get('sensor/:sensorId/average')
  async getAverage(@Param('sensorId') sensorId: string) {
    const average = await this.telemetryService.calculateAverage(sensorId);
    return { sensorId, average };
  }

  // Inserção individual (POST simples)
  @Post()
  async create(@Body() createTelemetryDto: CreateTelemetryDto) {
    return this.telemetryService.createBulk([createTelemetryDto]);
  }

  // Inserção em massa (Bulk POST) - Essencial para o seu teste de carga
  @Post('bulk')
  async createBulk(@Body() createTelemetryDtos: CreateTelemetryDto[]) {
    return this.telemetryService.createBulk(createTelemetryDtos);
  }
}