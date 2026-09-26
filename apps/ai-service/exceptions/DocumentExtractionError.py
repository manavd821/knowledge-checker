from typing import Any

from exceptions.AppError import AppError
from shared.errors.error_code import ErrorCode
from shared.types import LogLevel


class DocumentExtractionError(AppError):
    @property
    def status_code(self) -> int:
        return 500

    @property
    def code(self) -> ErrorCode:
        return ErrorCode.DOCUMENT_EXTRACTION_ERROR

    @property
    def log_level(self) -> LogLevel:
        return "ERROR"

    filetype: str
    extractor: str

    def __init__(
        self,
        message: str,
        filetype: str,
        extractor: str,
        cause: Any | None = None,
    ) -> None:
        super().__init__(message, expose_to_client=True, cause=cause)
        self.filetype = filetype
        self.extractor = extractor
