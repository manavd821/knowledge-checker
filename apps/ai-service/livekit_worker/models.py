from enum import StrEnum
from uuid import UUID
from pydantic import BaseModel
from models.enums import Speaker
class ParticipantMetadata(BaseModel):
    connection_id: str
    role: Speaker
    
class MessageType(StrEnum):
    TRANSCRIPT = "transcript"
    HINT = "hint"
class TranscriptPayload(BaseModel):
    session_id: UUID
    participant_id: UUID
    transcript: str
    role: str

class DataChannelMesage(BaseModel):
    type: MessageType
    payload: dict