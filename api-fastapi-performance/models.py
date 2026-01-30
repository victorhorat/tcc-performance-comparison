from sqlalchemy import Column, String, Float, DateTime, UUID
import uuid
from datetime import datetime
from database import Base

class Telemetry(Base):
    __tablename__ = "telemetry"

    # O UUID no Postgres mapeia para o String ou UUID do SQLAlchemy
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sensor_id = Column(String, index=True)
    value = Column(Float)
    unit = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)