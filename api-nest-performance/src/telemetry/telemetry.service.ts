import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telemetry } from './telemetry.entity';
import { CreateTelemetryDto } from './dto/create-telemetry.dto';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectRepository(Telemetry)
    private readonly repository: Repository<Telemetry>,
  ) {}

  // Busca todos os registros de um sensor (Equivalente ao Java e Python)
  async findBySensor(sensorId: string): Promise<Telemetry[]> {
    return this.repository.find({ 
      where: { sensorId } 
    });
  }

  // Cálculo de média via QueryBuilder para processamento no banco de dados
  async calculateAverage(sensorId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('t')
      .select('AVG(t.value)', 'avg')
      .where('t.sensor_id = :sensorId', { sensorId })
      .getRawOne();
    
    return parseFloat(result.avg) || 0;
  }

  // Inserção em massa (Bulk)
  // O TypeORM identifica se é um array e otimiza a query automaticamente
  async createBulk(dtos: CreateTelemetryDto[]): Promise<Telemetry[]> {
    return this.repository.save(dtos);
  }
}