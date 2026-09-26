from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class ForbiddenError(AppError):
    @property
    def status_code(self) -> int:
        return 403

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.FORBIDDEN

    @property
    def log_level(self) -> LogLevel:
        return "WARN"

    resource: str | None

    def __init__(
        self,
        message: str,
        resource: str | None = None,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, expose_to_client=True, cause=cause)
        self.resource = resource
