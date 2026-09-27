from uuid import UUID

from pydantic import BaseModel

from stream_worker.stream_events import StreamEvent

class StreamMessage(BaseModel):
    event_id: UUID
    event: StreamEvent
    payload: dict