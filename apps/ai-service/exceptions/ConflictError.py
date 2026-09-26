from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class ConflictError(AppError):
    @property
    def status_code(self) -> int:
        return 409

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.CONFLICT

    @property
    def log_level(self) -> LogLevel:
        return "WARN"

    resource: str
    reason: str

    def __init__(
        self,
        message: str,
        resource: str,
        reason: str,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, expose_to_client=True, cause=cause)
        self.resource = resource
        self.reason = reason
