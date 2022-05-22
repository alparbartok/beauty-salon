from fastapi import FastAPI
from routers import appointment, user, authentication

app = FastAPI()

app.include_router(appointment.router)
app.include_router(user.router)
app.include_router(authentication.router)