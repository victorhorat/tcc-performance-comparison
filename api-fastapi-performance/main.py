from fastapi import FastAPI, Depends, status
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine
from typing import List

app = FastAPI()

# Dependência do Banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/telemetry/sensor/{sensor_id}")
def get_by_sensor(sensor_id: str, db: Session = Depends(get_db)):
    return crud.get_telemetry_by_sensor(db, sensor_id=sensor_id)

@app.get("/api/telemetry/sensor/{sensor_id}/average")
def get_average(sensor_id: str, db: Session = Depends(get_db)):
    return crud.get_average_by_sensor(db, sensor_id=sensor_id)

@app.post("/api/telemetry", status_code=status.HTTP_201_CREATED)
def create(telemetry: schemas.TelemetryCreate, db: Session = Depends(get_db)):
    return crud.create_telemetry(db, telemetry=telemetry)

@app.post("/api/telemetry/bulk", status_code=status.HTTP_201_CREATED)
def create_bulk(telemetries: List[schemas.TelemetryCreate], db: Session = Depends(get_db)):
    return crud.create_telemetry_bulk(db, telemetries=telemetries)