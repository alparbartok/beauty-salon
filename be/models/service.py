from datetime import timedelta
from pydantic import BaseModel


class ServicePopulator(BaseModel):
    value: int
    label: str


class Service(BaseModel):
    id: int
    name: str
    price: int
    service_type: int
    duration: int

    class Config:
        orm_mode = True


class ServiceType(BaseModel):
    id: int
    type: str

    class Config:
        orm_mode = True
