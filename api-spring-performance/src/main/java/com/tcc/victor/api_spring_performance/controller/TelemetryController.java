package com.tcc.victor.api_spring_performance.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcc.victor.api_spring_performance.dto.TelemetryRecordDto;
import com.tcc.victor.api_spring_performance.model.Telemetry;
import com.tcc.victor.api_spring_performance.service.TelemetryService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/telemetry")
public class TelemetryController {
    
    @Autowired
    private TelemetryService service;

    @GetMapping("/sensor/{sensorId}")
    public List<Telemetry> getBySensor(@PathVariable String sensorId) {
        return service.getDataBySensor(sensorId);
    }
    
    @GetMapping("/sensor/{sensorId}/average")
    public Double getAverage(@PathVariable String sensorId) {
        return service.calculateAverage(sensorId);
    }

    @PostMapping
    public ResponseEntity<Telemetry> create(@RequestBody @Valid TelemetryRecordDto dto) {
        var telemetry = new Telemetry();
        BeanUtils.copyProperties(dto, telemetry);
        telemetry.setTimestamp(LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveTelemetry(telemetry));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Telemetry>> createBulk(@RequestBody List<@Valid TelemetryRecordDto> dtos
    ) {
        // Converte a lista de DTOs para uma lista de Entities
        List<Telemetry> entities = dtos.stream().map(dto -> {
            var telemetry = new Telemetry();
            BeanUtils.copyProperties(dto, telemetry);
            telemetry.setTimestamp(LocalDateTime.now());
            return telemetry;
        }).toList();

        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveAllTelemetries(entities));
    }
    
    
}
