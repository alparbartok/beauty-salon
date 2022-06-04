from fastapi import APIRouter, status, HTTPException
from database import SessionLocal
from models.service import Service
from sql import models
from typing import List

db = SessionLocal()

router = APIRouter(
    prefix='/service',
    tags=['Services']
)


@router.get('', response_model=List[Service], status_code=status.HTTP_200_OK)
def get_services():
    return db.query(models.Service).all()


@router.post('', response_model=Service, status_code=status.HTTP_200_OK)
def create_service(service: Service):
    new_service = models.Service(
        id=service.id,
        name=service.name,
        price=service.price,
        service_type=service.service_type,
        duration=service.duration
    )

    db.add(new_service)
    db.commit()

    return new_service


@router.get('/{service_id}', response_model=Service, status_code=status.HTTP_200_OK)
def get_service_by_id(service_id: int):
    return db.query(models.Service).filter(models.Service.id == service_id).first()


@router.delete('/{service_id}', status_code=status.HTTP_200_OK)
def delete_service(service_id: int):
    service_to_delete = db.query(models.Service).filter(models.Service.id == service_id).first()

    if service_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    db.delete(service_to_delete)
    db.commit()


@router.put('/{service_id}', response_model=Service, status_code=status.HTTP_200_OK)
def update_service(service_id: int, service: Service):
    service_to_update = db.query(models.Service).filter(models.Service.id == service_id)
    service_to_update.service_type = service.service_type
    service_to_update.name = service.name
    service_to_update.price = service.price
    service_to_update.duration = service.duration

    db.commit()
    return service_to_update
