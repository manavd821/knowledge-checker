from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class ExternalServiceError(AppError):
    @property
    def status_code(self) -> int:
        return 503

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.EXTERNAL_SERVICE_ERROR

    @property
    def log_level(self) -> LogLevel:
        return "ERROR"

    service: str
    operation: str

    def __init__(
        self,
        message: str,
        service: str,
        operation: str,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, expose_to_client=True, cause=cause)
        self.service = service
        self.operation = operation
