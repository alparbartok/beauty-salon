from datetime import time
from pydantic import BaseModel


class Service(BaseModel):
    id: int
    name: str
    price: float
    service_type: int
    duration: time

    class Config:
        orm_mode = True


class ServiceType(BaseModel):
    id: int
    type: str

    class Config:
        orm_mode = True
