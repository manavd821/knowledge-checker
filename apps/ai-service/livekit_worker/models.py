from pydantic import BaseModel

from models.enums import Speaker


class ParticipantMetadata(BaseModel):
    connection_id: str
    role: Speaker