from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class NotFoundError(AppError):
    @property
    def status_code(self) -> int:
        return 404

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.NOT_FOUND

    @property
    def log_level(self) -> LogLevel:
        return "INFO"

    resource: str | None
    id: str | None

    def __init__(
        self,
        message: str,
        resource: str | None = None,
        id: str | None = None,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, expose_to_client=True, cause=cause)
        self.resource = resource
        self.id = id
