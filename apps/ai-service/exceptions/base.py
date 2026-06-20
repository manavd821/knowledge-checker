class AppError(Exception):
    expose : bool
    def __init__(
        self, 
        message : str,
        *,
        code : str,
        status_code : int,
        details : dict | None = None
    ) -> None:
        super().__init__(message)
        self.message = message
        self.code = code
        self.details = details or {}
        self.status_code = status_code

