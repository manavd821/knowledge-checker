from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class CacheMissError(AppError):
    """Raised when an expected cache entry is not found."""

    @property
    def status_code(self) -> int:
        return 404

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.CACHE_MISS

    @property
    def log_level(self) -> LogLevel:
        return "WARN"

    def __init__(
        self,
        message: str = "Requested cache entry was not found",
        *,
        expose_to_client: bool = False,
        cause: Any | None = None,
    ) -> None:
        super().__init__(
            message,
            expose_to_client=expose_to_client,
            cause=cause,
        )