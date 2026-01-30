from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TelemetryBase(BaseModel):
    sensor_id: str = Field(..., min_length=1)
    value: float = Field(..., gt=0)
    unit: str

class TelemetryCreate(TelemetryBase):
    pass # Este é o nosso DTO de entrada (POST)

class Telemetry(TelemetryBase):
    id: str # Para UUID
    timestamp: datetime

    class Config:
        from_attributes = True