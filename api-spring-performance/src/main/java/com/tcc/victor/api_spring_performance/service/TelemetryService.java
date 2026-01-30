package com.tcc.victor.api_spring_performance.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tcc.victor.api_spring_performance.model.Telemetry;
import com.tcc.victor.api_spring_performance.repository.TelemetryRepository;

@Service
public class TelemetryService {

    @Autowired
    private TelemetryRepository repository;

    public List<Telemetry> getAllData() {
        return repository.findAll();
    }

    public List<Telemetry> getDataBySensor(String sensorId){
        return repository.findBySensorId(sensorId);
    }

    // Exemplo de processamento para teste de performance
    public Double calculateAverage(String sensorId){
        List<Telemetry> data = repository.findBySensorId(sensorId);
        return data.stream().mapToDouble(Telemetry::getValue).average().orElse(0.0);
    }
    
    public Telemetry saveTelemetry(Telemetry telemetry){
        if (telemetry.getTimestamp() == null) {
            telemetry.setTimestamp(java.time.LocalDateTime.now());
        }
        return repository.save(telemetry);
    }

    public List<Telemetry> saveAllTelemetries(List<Telemetry> telemetries){
        telemetries.forEach(t -> {
            if(t.getTimestamp() == null){
                t.setTimestamp(java.time.LocalDateTime.now());
            }
        });
        return repository.saveAll(telemetries);
    }

    
}
