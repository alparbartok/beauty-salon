from fastapi import APIRouter, status
from database import SessionLocal
from models.user import EmployeePopulator
from models.service import ServicePopulator
from models.populator import Availability
from sql import models
from typing import List
from dependecies.populator import generate_available_time
from datetime import datetime, timedelta

router = APIRouter(
    prefix='/populator',
    tags=['Populator']
)

db = SessionLocal()


@router.get('/services/{service_type}', response_model=List[ServicePopulator], status_code=status.HTTP_200_OK)
def get_services(service_type: int):
    services = db.query(models.Service).filter(models.Service.service_type == service_type).all()

    service_list = []
    for i in services:
        service_list.append(ServicePopulator(label=f'{i.name} - {i.price} Ron', value=i.id))

    return service_list


@router.get('/service-types', response_model=List[ServicePopulator], status_code=status.HTTP_200_OK)
def get_service_types():
    service_types = db.query(models.ServiceType).all()

    service_type_list = []
    for i in service_types:
        service_type_list.append(ServicePopulator(label=i.type, value=i.id))

    return service_type_list


@router.get('/workers', response_model=List[EmployeePopulator], status_code=status.HTTP_200_OK)
def get_workers():
    employees = db.query(models.Account).filter(models.Account.user_type == 1).all()

    employee_list: List[EmployeePopulator] = []
    for i in employees:
        employee = EmployeePopulator(label=i.first_name + ' ' + i.last_name, value=i.id)
        employee_list.append(employee)

    return employee_list


@router.post('/available-periods/{worker_id}', status_code=status.HTTP_200_OK)
def get_available_hours(worker_id: int, appointment_data: Availability):
    appointments = db.query(models.Appointment).filter(
        models.Appointment.worker_id == worker_id).filter(
        models.Appointment.date.between(f'{appointment_data.appointment_date} 00:00:00',
                                        f'{appointment_data.appointment_date} 23:59:59')).order_by(
        models.Appointment.date.asc()).all()
    service = db.query(models.Service).filter(models.Service.id == appointment_data.service_id).first()

    work_begins = "08:00:00"
    work_finishes = "18:00:00"
    availability_list = []
    duration = timedelta(minutes=service.duration)
    length = len(appointments)

    for i in appointments:
        print(i.date)

    if length == 0:
        availability_list.extend(
            generate_available_time(
                datetime.strptime(f'{appointment_data.appointment_date} {work_begins}', '%Y-%m-%d %H:%M:%S'),
                datetime.strptime(f'{appointment_data.appointment_date} {work_finishes}', '%Y-%m-%d %H:%M:%S'),
                duration))
    else:
        for i in range(length + 1):
            if i == 0:
                start_date = datetime.strptime(f'{appointment_data.appointment_date} {work_begins}',
                                               '%Y-%m-%d %H:%M:%S')
                end_date = datetime.strptime(f'{appointments[i].date}', '%Y-%m-%d %H:%M:%S')

                if start_date == end_date:
                    continue
            elif i == len(appointments):
                start_date = datetime.strptime(f'{appointments[i - 1].date}', '%Y-%m-%d %H:%M:%S') + duration
                end_date = datetime.strptime(f'{appointment_data.appointment_date} {work_finishes}',
                                             '%Y-%m-%d %H:%M:%S')
            else:
                start_date = datetime.strptime(f'{appointments[i - 1].date}', '%Y-%m-%d %H:%M:%S') + duration
                end_date = datetime.strptime(f'{appointments[i].date}', '%Y-%m-%d %H:%M:%S')

            availability_list.extend(
                generate_available_time(start_date, end_date, duration))

    return availability_list
