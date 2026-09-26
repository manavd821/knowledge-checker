from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class MessageDeserializationError(AppError):
    @property
    def status_code(self) -> int:
        return 500

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.MESSAGE_DESERIALIZATION_ERROR

    @property
    def log_level(self) -> LogLevel:
        return "WARN"

    raw: bytes | None

    def __init__(
        self,
        message: str,
        raw: bytes | None = None,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, cause=cause)
        self.raw = raw
