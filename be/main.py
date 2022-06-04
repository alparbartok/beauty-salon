from fastapi import FastAPI
from routers import appointment, user, authentication, populator, service
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(appointment.router)
app.include_router(user.router)
app.include_router(authentication.router)
app.include_router(populator.router)
app.include_router(service.router)
