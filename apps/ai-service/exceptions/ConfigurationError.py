from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel

class ConfigurationError(AppError):
    @property
    def status_code(self) -> int:
        return 500

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.CONFIGURATION_ERROR

    @property
    def log_level(self) -> LogLevel:
        return "ERROR"

    def __init__(
        self,
        message: str,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, cause=cause)
