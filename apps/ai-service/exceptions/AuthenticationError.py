from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import (
    LogLevel,
    AuthenticationMechanism,
)


class AuthenticationError(AppError):
    @property
    def status_code(self) -> int:
        return 401

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.AUTHENTICATION_FAILED

    @property
    def log_level(self) -> LogLevel:
        return "WARN"

    mechanism: AuthenticationMechanism

    def __init__(
        self,
        message: str,
        mechanism: Any,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, cause=cause)
        self.mechanism = mechanism
