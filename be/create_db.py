from database import Base, engine
from sql.models import Service, ServiceType, UserType, Account, Appointment

print("Creating database ....")

Base.metadata.create_all(engine)
