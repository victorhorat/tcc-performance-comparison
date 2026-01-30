import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryModule } from './telemetry/telemetry.module';
import { Telemetry } from './telemetry/telemetry.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user_tcc',
      password: 'password_tcc',
      database: 'telemetry_db',
      autoLoadEntities: true, // Isso ajuda a evitar erros de dependência
      synchronize: false,
    }),
    TelemetryModule,
  ],
})
export class AppModule {}