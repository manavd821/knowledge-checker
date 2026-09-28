from uuid import UUID

from pydantic import BaseModel

from models.enums import ContentType, Speaker


class CreateTurnEventPayload(BaseModel):
    turn_id: UUID
    session_id: UUID
    participant_id: UUID
    
    speaker: Speaker
    content: str
    content_type: ContentType 
    
    user_audio_duration_sec: float | None = None
    tokens_used: int | None = None
