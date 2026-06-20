from exceptions.client import ClientError

class DatabaseError(ClientError):
    def __init__(
        self, operation: str, reason : str, status_code : int = 500) -> None:
        super().__init__(
            f"Database operation '{operation}' failed: {reason}",
            code="SERVER_DATABASE_ERROR",
            status_code=status_code,
            details={"operation": operation, "reason": reason}
        )