from abc import ABC, abstractmethod
from typing import Any
from shared.types import LogLevel
from shared.errors.error_code import ErrorCode

class AppError(ABC, Exception):
    """Base exception for all expected application errors."""
    
    @property
    @abstractmethod
    def status_code(self) -> int:
        pass
    @property
    @abstractmethod
    def code(self) -> ErrorCode:
        pass

    @property
    @abstractmethod
    def log_level(self) -> LogLevel:
        pass
    
    def __init__(
        self, 
        message : str,
        *,
        expose_to_client: bool = False,
        cause : Any | None = None
    ) -> None:
        super().__init__(message)
        self.message = message
        self.expose_to_client = expose_to_client
        self.cause = cause
        
    def to_dict(self):
        return {
            "success": False,
            "code": self.code,
            "message": (
                str(self)
                if self.expose_to_client
                else "INTERNAL_SERVER_ERROR"
            ),
            "status_code": self.status_code,
        }

