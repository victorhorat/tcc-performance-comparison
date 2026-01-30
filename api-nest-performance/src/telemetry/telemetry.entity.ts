import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('telemetry')
export class Telemetry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'sensor_id' })
  sensorId: string;

  @Column('float')
  value: number;

  @Column()
  unit: string;

  @CreateDateColumn()
  timestamp: Date;
}