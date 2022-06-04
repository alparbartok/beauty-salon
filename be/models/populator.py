from pydantic import BaseModel
from datetime import date


class Availability(BaseModel):
    appointment_date: date
    service_id: int
