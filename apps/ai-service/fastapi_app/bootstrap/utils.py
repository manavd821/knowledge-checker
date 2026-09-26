from pydantic import ValidationError
from exceptions.AppError import AppError
from exceptions import (
    NotFoundError,
)

def get_status_code(exc: AppError) -> int:
    
    if isinstance(exc, ValidationError):
        return 400
    
    if isinstance(exc, NotFoundError):
        return 404
    
    # if isinstance(exc, InterviewEndedError):
    #     return 409
    
    if isinstance(exc, AppError):
        return 500
    
    return 500