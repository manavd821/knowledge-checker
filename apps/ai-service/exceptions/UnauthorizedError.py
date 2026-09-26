from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class UnauthorizedError(AppError):
    @property
    def status_code(self) -> int:
        return 401

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.UNAUTHORIZED

    @property
    def log_level(self) -> LogLevel:
        return "WARN"

    def __init__(
        self,
        message: str,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, expose_to_client=True, cause=cause)
