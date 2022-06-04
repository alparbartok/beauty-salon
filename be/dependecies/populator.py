from datetime import timedelta, datetime, time
from typing import List


def generate_available_time(start: datetime, end: datetime, duration: timedelta) -> List[time]:
    time_delta = timedelta(minutes=15)

    availability_list = []
    current = start

    while current + duration <= end:
        availability_list.append(current.time())
        current = current + time_delta

    return availability_list
