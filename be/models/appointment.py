from pydantic import BaseModel
import datetime


class Appointment(BaseModel):
    client_id: int
    worker_id: int
    price: float
    date: datetime.datetime
    status: str
    access_code: str
