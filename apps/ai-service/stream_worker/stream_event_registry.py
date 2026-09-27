
from events.payloads import (
    CandidateTurnCompleted,
    CandidateTurnUpdated,
    InterviewerTurnCompleted,
    RuntimeContextUpdated,
)
from pydantic import BaseModel
from stream_worker.stream_events import StreamEvent

class StreamEventRegistry:

    def __init__(self):
        self._mappings: dict[
            StreamEvent,
            type[BaseModel],
        ] = {
            StreamEvent.CANDIDATE_TURN_COMPLETED:
                CandidateTurnCompleted,

            StreamEvent.INTERVIEWER_TURN_COMPLETED:
                InterviewerTurnCompleted,
                
            StreamEvent.CANDIDATE_TURN_UPDATE:
                CandidateTurnUpdated,
                            
            StreamEvent.RUNTIME_CONTEXT_UPDATED:
                RuntimeContextUpdated
        }

    def deserialize_payload(
        self,
        event: StreamEvent,
        raw_payload: str,
    ) -> BaseModel:
        payload_type = self._mappings.get(event)
        if payload_type is None:
            raise ValueError(
                f"No payload type registered for event {event.value}"
            )
        
        return payload_type.model_validate_json(raw_payload)