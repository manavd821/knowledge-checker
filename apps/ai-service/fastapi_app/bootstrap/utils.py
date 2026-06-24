from pydantic import ValidationError
from exceptions.base import AppError
from exceptions.infrastructure import (
    InfrastructureError,
)
from exceptions.domain import (
    DomainError,
    SessionNotFoundError,
    InterviewEndedError,
)

def get_status_code(exc: AppError) -> int:
    
    if isinstance(exc, ValidationError):
        return 400
    
    if isinstance(exc, SessionNotFoundError):
        return 404
    
    if isinstance(exc, InterviewEndedError):
        return 409
    
    if isinstance(exc, InfrastructureError):
        return 500
    
    return 500