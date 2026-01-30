from sqlalchemy.orm import Session
from sqlalchemy import func
import models, schemas

# BUSCA: Equivalente ao findBySensorId do Spring Data JPA.
# Nota de Performance: Retorna uma lista de objetos. Se o sensor tiver 10k registros, 
# o SQLAlchemy converterá todos em objetos Python (custoso em memória).
def get_telemetry_by_sensor(db: Session, sensor_id: str):
    return db.query(models.Telemetry).filter(models.Telemetry.sensor_id == sensor_id).all()

# ESCRITA ÚNICA: Equivalente ao save() do Spring.
# Segue o fluxo: Transforma DTO em Model -> Adiciona -> Commita -> Atualiza objeto.
def create_telemetry(db: Session, telemetry: schemas.TelemetryCreate):
    db_item = models.Telemetry(**telemetry.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

# ESCRITA EM MASSA (BULK): O ponto alto para testar vazão de dados no TCC.
# Usa add_all para reduzir o número de transações abertas com o Postgres.
def create_telemetry_bulk(db: Session, telemetries: list[schemas.TelemetryCreate]):
    db_items = [models.Telemetry(**t.model_dump()) for t in telemetries]
    db.add_all(db_items)
    db.commit()
    return db_items

# CÁLCULO AGREGADO: Processamento no Banco de Dados.
# Diferente do Spring (que processou na aplicação), aqui delegamos o cálculo ao SQL (AVG).
# É muito mais rápido porque a rede trafega apenas 1 número em vez de 10.000 linhas.
def get_average_by_sensor(db: Session, sensor_id: str):
    # Executa: SELECT AVG(value) FROM telemetry WHERE sensor_id = '...'
    result = db.query(func.avg(models.Telemetry.value)).filter(
        models.Telemetry.sensor_id == sensor_id
    ).scalar()
    return result if result is not None else 0.0