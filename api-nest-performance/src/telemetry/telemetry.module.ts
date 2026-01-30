import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryService } from './telemetry.service';
import { TelemetryController } from './telemetry.controller';
import { Telemetry } from './telemetry.entity';

@Module({
  imports: [
    // Registra a entidade Telemetry para ser usada no Service
    TypeOrmModule.forFeature([Telemetry])
  ],
  controllers: [TelemetryController],
  providers: [TelemetryService],
})
export class TelemetryModule {}