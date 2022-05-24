import random
import string


def generate_access_code(length: int) -> str:
    letters = string.ascii_letters + string.digits
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str
