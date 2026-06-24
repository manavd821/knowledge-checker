class AppError(Exception):
    """Base exception for all expected application errors."""
    expose : bool
    def __init__(
        self, 
        message : str,
        *,
        code : str,
        details : dict | None = None
    ) -> None:
        super().__init__(message)
        self.message = message
        self.code = code
        self.details = details or {}

