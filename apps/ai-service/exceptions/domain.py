from exceptions.base import AppError

class DomainError(AppError):
    """Business rule violation."""
    
class SessionNotFoundError(DomainError):
    def __init__(self, session_id: str):
        super().__init__(
            f"Session '{session_id}' does not exist",
            code="SESSION_NOT_FOUND",
        )

        self.session_id = session_id

class TurnStateNotFound(DomainError):
    def __init__(self, session_id: str):
        super().__init__(
            f"Session '{session_id}': Turn state not found",
            code="TURNSTATE_NOT_FOUND",
        )

        self.session_id = session_id

class InterviewEndedError(DomainError):

    def __init__(self, session_id: str):
        super().__init__(
            f"Interview '{session_id}' already ended",
            code="INTERVIEW_ENDED",
        )

        self.session_id = session_id
        
