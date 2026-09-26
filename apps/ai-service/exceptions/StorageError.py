from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class StorageError(AppError):
    @property
    def status_code(self) -> int:
        return 500

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.STORAGE_ERROR

    @property
    def log_level(self) -> LogLevel:
        return "ERROR"

    provider: str
    operation: str

    def __init__(
        self,
        message: str,
        provider: str,
        operation: str,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, cause=cause)
        self.provider = provider
        self.operation = operation
