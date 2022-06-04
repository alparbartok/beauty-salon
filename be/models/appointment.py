from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Appointment(BaseModel):
    client_id: Optional[int]
    worker_id: int
    date: datetime
    status: str
    access_code: str
    name: Optional[str]
    email: Optional[str]
    phone_number: Optional[str]
    reason: Optional[str]

    class Config:
        orm_mode = True


class NewAppointment(BaseModel):
    worker_id: int
    date: datetime
    name: Optional[str]
    email: Optional[str]
    phone_number: Optional[str]
    service: int


class NewAppointmentResponse(BaseModel):
    worker: str
    date: datetime
    name: str
    email: str
    phone_number: Optional[str]
    service: str
    price: str
    status: str
    access_code: str

