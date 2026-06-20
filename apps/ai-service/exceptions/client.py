from exceptions.base import AppError

class ClientError(AppError):
    expose = True
    def __init__(
        self, 
        message: str, 
        *, 
        code: str = "CLIENT_ERROR", 
        status_code: int = 400, 
        details: dict | None = None
    ) -> None:
        super().__init__(message, code=code, status_code=status_code, details=details)