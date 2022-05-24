from fastapi import APIRouter, Path, status, Depends, Request, HTTPException
from models.appointment import Appointment, NewAppointment
from dependecies.appointment import generate_access_code
from dependecies.authentication import get_header_token, get_current_user
from database import SessionLocal
from sql import models
from typing import List
from datetime import datetime

db = SessionLocal()

router = APIRouter(
    prefix='/appointment',
    tags=['Appointment']
)


@router.get('', response_model=List[Appointment], status_code=status.HTTP_200_OK)
async def get_all_appointments(request: Request = Depends(get_header_token)):
    user = await get_current_user(request.headers.get('x-token'))

    if user.user_type == 1:
        appointments = db.query(models.Appointment).filter(models.Appointment.worker_id == user.id)
    else:
        appointments = db.query(models.Appointment).filter(models.Appointment.client_id == user.id)

    return appointments


@router.post('', response_model=Appointment, status_code=status.HTTP_200_OK)
async def create_appointment(request: Request, appointment: NewAppointment):
    token = request.headers.get('x-token')

    while True:
        access_code = generate_access_code(8)
        existing_access_code = db.query(models.Appointment).filter(
            models.Appointment.access_code == access_code).first()

        if existing_access_code is None:
            break

    price = db.query(models.Service).filter(models.Appointment.id == appointment.service).first().price

    if token is None:
        new_appointment = Appointment(
            worker_id=appointment.worker_id,
            date=appointment.date,
            status='pending',
            access_code=access_code,
            name=appointment.name,
            email=appointment.email,
            phone_number=appointment.phone_number,
            price=price
        )
    else:
        new_appointment = Appointment(
            worker_id=appointment.worker_id,
            date=appointment.date,
            status='pending',
            access_code=access_code,
            price=price,
            client_id=token.access_token.id
        )

    db.add(new_appointment)
    db.commit()

    return new_appointment


@router.get('/{code}', status_code=status.HTTP_200_OK, response_model=Appointment)
def get_appointment_by_code(code: str = Path(None, description="Appointments access code")):
    return db.query(models.Appointment).filter(models.Appointment.access_code == code).first()


@router.delete('/{code}', status_code=status.HTTP_200_OK)
def delete_appointment(code: str = Path(None, description="Appointments access code")):
    appointment_to_delete = db.query(models.Appointment).filter(models.Appointment.access_code == code).first()

    if appointment_to_delete in None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    db.delete(appointment_to_delete)
    db.commit()


@router.post('/confirm/{code}', status_code=status.HTTP_200_OK)
def confirm_appointment(code: str = Path(None, description="Appointments access code")):
    appointment_to_confirm = db.query(models.Appointment).filter(models.Appointment.access_code == code)
    appointment_to_confirm.status = 'confirmed'

    db.commit()


@router.post('/refuse/{code}')
def refuse_appointment(message: str, code: str = Path(None, description="Appointments access code")):
    appointment_to_refuse = db.query(models.Appointment).filter(models.Appointment.access_code == code)
    appointment_to_refuse.status = 'refused'
    appointment_to_refuse.reason = message

    db.commit()


@router.post('/reschedule/{code}')
def reschedule_appointment(date: datetime, code: str = Path(None, description="Appointments access code")):
    appointment_to_reschedule = db.query(models.Appointment).filter(models.Appointment.access_code == code)
    appointment_to_reschedule.date = date

    db.commit()
