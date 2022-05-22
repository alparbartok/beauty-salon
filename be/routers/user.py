from fastapi import APIRouter, Depends, Request, status, HTTPException
from dependecies.authentication import get_current_user, get_header_token
from database import SessionLocal
from sql import models
from models.user import User

db = SessionLocal()

router = APIRouter(
    prefix='/user',
    tags=['User'],
    dependencies=[Depends(get_header_token)]
)


@router.get('/me', response_model=User, status_code=status.HTTP_200_OK)
async def get_user(request: Request):
    user = await get_current_user(request.headers.get('x-token'))

    return user


@router.get('/{user_id}', response_model=User, status_code=status.HTTP_200_OK)
async def get_user(user_id: int):
    user = db.query(models.Account).filter(models.Account.id == user_id).first()

    return user


@router.put('/{user_id}', response_model=User, status_code=status.HTTP_200_OK)
def update_user(user_id: int, user: User):
    user_to_update = db.query(models.Account).filter(models.Account.id == user_id).first()
    user_to_update.first_name = user.first_name
    user_to_update.last_name = user.last_name
    user_to_update.birth_date = user.birth_date
    user_to_update.email = user.email
    user_to_update.phone_number = user.phone_number

    db.commit()

    return user_to_update


@router.delete('/{user_id}', status_code=status.HTTP_200_OK)
def delete_user(user_id: int):
    user_to_delete = db.query(models.Account).filter(models.Account.id == user_id).first()

    if user_to_delete in None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")

    db.delete(user_to_delete)
    db.commit()
