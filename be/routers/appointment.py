from fastapi import APIRouter, Path, status, Depends, Request, HTTPException
from models.appointment import Appointment, NewAppointment, NewAppointmentResponse
from dependecies.appointment import generate_access_code
from dependecies.authentication import get_header_token, get_current_user
from database import SessionLocal
from sql import models
from typing import List
from datetime import datetime
from jose import jwt
from dependecies.authentication import SECRET_KEY, ALGORITHM

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


@router.post('', response_model=NewAppointmentResponse, status_code=status.HTTP_200_OK)
async def create_appointment(request: Request, appointment: NewAppointment):
    token = request.headers.get('x-token')

    while True:
        access_code = generate_access_code(8)
        existing_access_code = db.query(models.Appointment).filter(
            models.Appointment.access_code == access_code).first()

        if existing_access_code is None:
            break

    service = db.query(models.Service).filter(models.Service.id == appointment.service).first()
    worker = db.query(models.Account).filter(models.Account.id == appointment.worker_id).first()

    if token is None:
        new_appointment = models.Appointment(
            worker_id=appointment.worker_id,
            date=appointment.date,
            status='pending',
            access_code=access_code,
            name=appointment.name,
            email=appointment.email,
            phone_number=appointment.phone_number,
            service=appointment.service
        )

        response = NewAppointmentResponse(
            worker=f'{worker.first_name} {worker.last_name}',
            date=new_appointment.date,
            name=new_appointment.name,
            email=new_appointment.email,
            phone_number=new_appointment.phone_number,
            service=service.name,
            price=service.price,
            status=new_appointment.status,
            access_code=new_appointment.access_code
        )
    else:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        new_appointment = models.Appointment(
            worker_id=appointment.worker_id,
            date=appointment.date,
            status='pending',
            access_code=access_code,
            client_id=payload.get('id'),
            service=appointment.service
        )

        response = NewAppointmentResponse(
            worker=f'{worker.first_name} {worker.last_name}',
            date=new_appointment.date,
            name=f"{payload.get('first_name')} {payload.get('last_name')}",
            email=payload.get('email'),
            phone_number=payload.get('phone_number'),
            service=service.name,
            price=service.price,
            status=new_appointment.status,
            access_code=new_appointment.access_code
        )

    db.add(new_appointment)
    db.commit()

    return response


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
