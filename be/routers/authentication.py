from fastapi import APIRouter, HTTPException, status
from database import SessionLocal
from models.user import Account, Login
from sql import models
from dependecies.authentication import authenticate_user, create_access_token, get_password_hash
from models.user import Token

router = APIRouter(
    tags=['Authentication']
)

db = SessionLocal()


@router.post('/login', response_model=Token, status_code=status.HTTP_200_OK)
def login(user: Login):
    local_user = authenticate_user(user.email, user.password)

    if not local_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = create_access_token(data={
        "email": local_user.email,
        "user_type": local_user.user_type,
        "first_name": local_user.first_name,
        "last_name": local_user.last_name,
        "birth_date": str(local_user.birth_date),
        "phone_number": local_user.phone_number
    })

    return {"access_token": access_token, "token_type": "bearer"}


@router.post('/register', response_model=Token, status_code=status.HTTP_200_OK)
def register(user: Account):
    new_user = models.Account(
        id=len(db.query(models.Account).all()) + 1,
        first_name=user.first_name,
        last_name=user.last_name,
        birth_date=user.birth_date,
        email=user.email,
        phone_number=user.phone_number,
        password=get_password_hash(user.password),
    )
    access_token = create_access_token(data={
        "email": new_user.email,
        "user_type": new_user.user_type,
        "first_name": new_user.first_name,
        "last_name": new_user.last_name,
        "birth_date": str(new_user.birth_date),
        "phone_number": new_user.phone_number
    })

    db.add(new_user)
    db.commit()

    return {"access_token": access_token, "token_type": "bearer"}
