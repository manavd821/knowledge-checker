from exceptions.client import ClientError


class SessionNotFoundError(ClientError):
    def __init__(
        self, 
        session_id : str,
        status_code : int = 400,
    ) -> None:
        super().__init__(
            f"Session '{session_id}' not found",
            code="SESSION_NOT_FOUND",
            status_code = status_code,
        )
        
