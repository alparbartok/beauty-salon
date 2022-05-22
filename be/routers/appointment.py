from fastapi import APIRouter, Path
from models.appointment import Appointment

router = APIRouter(
    prefix='/appointment',
    tags=['Appointment']
)


@router.get('')
def get_all_appointments():
    return None


@router.post('')
def create_appointment():
    return None


@router.delete('/{code}')
def delete_appointment(code: str = Path(None, description="Appointments access code")):
    return None


@router.get('/{code}')
def get_appointment_by_code(code: str = Path(None, description="Appointments access code")):
    return None


@router.delete('/{code}')
def delete_appointment(code: str = Path(None, description="Appointments access code")):
    return None


@router.post('/confirm/{code}')
def confirm_appointment(code: str = Path(None, description="Appointments access code")):
    return None


@router.post('/refuse/{code}')
def refuse_appointment(code: str = Path(None, description="Appointments access code")):
    return None


@router.post('/reschedule/{code}')
def reschedule_appointment(code: str = Path(None, description="Appointments access code")):
    return None
