from uuid import UUID

from pydantic import BaseModel

from lib.redis.stream.stream_events import StreamEvent
from models.enums import Speaker

class TurnCompletedPayload(BaseModel):
    session_id: str
    speaker: Speaker
    transcript: str
    
class StreamMessage(BaseModel):
    event_id: UUID
    event: StreamEvent
    payload: dict