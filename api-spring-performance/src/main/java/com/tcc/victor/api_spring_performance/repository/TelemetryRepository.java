package com.tcc.victor.api_spring_performance.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcc.victor.api_spring_performance.model.Telemetry;
import java.util.List;


@Repository
public interface TelemetryRepository extends JpaRepository<Telemetry, UUID> {
    
    //Método para buscar todos os registros de um sensor específico
    List<Telemetry> findBySensorId(String sensorId);
}
