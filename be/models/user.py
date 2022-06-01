from pydantic import BaseModel
from datetime import date
from typing import Optional


class Account(BaseModel):
    first_name: str
    last_name: str
    birth_date: Optional[date]
    email: str
    phone_number: Optional[str]
    password: str


class User(BaseModel):
    id: Optional[int]
    first_name: str
    last_name: str
    birth_date: Optional[date]
    email: str
    phone_number: Optional[str]
    user_type: int

    class Config:
        orm_mode = True


class UserType(BaseModel):
    id: int
    type: str

    class Config:
        orm_mode = True


class Login(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str
    user_type: int
    first_name: str
    last_name: str
    birth_date: Optional[date]
    phone_numer: Optional[str]
