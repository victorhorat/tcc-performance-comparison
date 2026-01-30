package com.tcc.victor.api_spring_performance.model;

import java.time.LocalDateTime;
import java.util.UUID;
 
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "telemetry")
@Data // lombok gera getters and setters
public class Telemetry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    
    @Column(name = "sensor_id")
    private String sensorId;

    private Double value;
    private String unit;
    private LocalDateTime timestamp;
}
