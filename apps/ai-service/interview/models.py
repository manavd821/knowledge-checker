from uuid import UUID

from pydantic import BaseModel

from models.enums import Speaker


class UserTurnCompletedPayload(BaseModel):
    transcript: str
    session_id: UUID
    participant_id: str
    role: Speaker