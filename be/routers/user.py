from fastapi import APIRouter, Depends, Request, status, HTTPException
from dependecies.authentication import get_current_user, get_header_token
from database import SessionLocal
from sql import models
from models.user import User, UserType
from typing import List

db = SessionLocal()

router = APIRouter(
    prefix='/user',
    tags=['User'],
)


@router.get('/clients', response_model=List[User], status_code=status.HTTP_200_OK,
            dependencies=[Depends(get_header_token)]
            )
def get_clients():
    return db.query(models.Account).filter(models.Account.user_type == 2)


@router.get('/me', response_model=User, status_code=status.HTTP_200_OK, dependencies=[Depends(get_header_token)])
async def get_user(request: Request):
    return await get_current_user(request.headers.get('x-token'))


@router.get('/types', status_code=status.HTTP_200_OK, response_model=List[UserType])
def get_user_type():
    return db.query(models.UserType).all()


@router.get('/{user_id}', response_model=User, status_code=status.HTTP_200_OK,
            dependencies=[Depends(get_header_token)])
async def get_user(user_id: int):
    return db.query(models.Account).filter(models.Account.id == user_id).first()


@router.put('/{user_id}', response_model=User, status_code=status.HTTP_200_OK,
            dependencies=[Depends(get_header_token)])
def update_user(user_id: int, user: User):
    user_to_update = db.query(models.Account).filter(models.Account.id == user_id).first()
    user_to_update.first_name = user.first_name
    user_to_update.last_name = user.last_name
    user_to_update.birth_date = user.birth_date
    user_to_update.email = user.email
    user_to_update.phone_number = user.phone_number

    db.commit()

    return user_to_update


@router.delete('/{user_id}', status_code=status.HTTP_200_OK, dependencies=[Depends(get_header_token)])
def delete_user(user_id: int):
    user_to_delete = db.query(models.Account).filter(models.Account.id == user_id).first()

    if user_to_delete is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")

    db.delete(user_to_delete)
    db.commit()
