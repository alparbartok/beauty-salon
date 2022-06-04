from database import Base
from sqlalchemy import String, Integer, Column, ForeignKey, Date, DateTime, Float, Time


class ServiceType(Base):
    __tablename__ = 'service_type'
    id = Column(Integer, primary_key=True)
    type = Column(String(20), nullable=False)


class UserType(Base):
    __tablename__ = 'user_type'
    id = Column(Integer, primary_key=True)
    type = Column(String(20), nullable=False)


class Service(Base):
    __tablename__ = 'service'
    id = Column(Integer, primary_key=True)
    name = Column(String(80), nullable=False)
    price = Column(Integer, nullable=False)
    service_type = Column(Integer, ForeignKey('service_type.id'))
    duration = Column(Integer, nullable=False)


class Account(Base):
    __tablename__ = 'account'
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    birth_date = Column(Date, default=None, nullable=True)
    user_type = Column(Integer, ForeignKey('user_type.id'), default=2)
    email = Column(String(100), nullable=False, unique=True)
    phone_number = Column(String(20), default=None, nullable=True)
    password = Column(String(255), nullable=False)


class Appointment(Base):
    __tablename__ = 'appointment'
    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey('account.id'), nullable=True, default=None)
    worker_id = Column(Integer, ForeignKey('account.id'))
    date = Column(DateTime)
    status = Column(String(20), nullable=False)
    access_code = Column(String(20), nullable=True, default='')
    name = Column(String(50), nullable=True)
    email = Column(String(50), nullable=True)
    phone_number = Column(String(50), nullable=True)
    reason = Column(String(255), nullable=True)
    service = Column(Integer, ForeignKey('service.id'), nullable=False)
