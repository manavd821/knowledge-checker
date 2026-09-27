
from events.enums import LiveSessionEvent
from events.payloads import (
    CandidateTurnCompleted,
    CandidateTurnUpdated,
    InterviewerResponseReady,
    InterviewerTurnCompleted,
    RuntimeContextUpdated,
    SessionPausedPayload,
)

from pydantic import BaseModel

class EventRegistry:

    def __init__(self):
        self._mappings: dict[
            LiveSessionEvent,
            type[BaseModel],
        ] = {
            LiveSessionEvent.CANDIDATE_TURN_COMPLETED:
                CandidateTurnCompleted,

            LiveSessionEvent.INTERVIEWER_TURN_COMPLETED:
                InterviewerTurnCompleted,

            LiveSessionEvent.SESSION_PAUSED:
                SessionPausedPayload,
                
            LiveSessionEvent.CANDIDATE_TURN_UPDATE:
                CandidateTurnUpdated,
            
            LiveSessionEvent.INTERVIEWER_RESPONSE_READY:
                InterviewerResponseReady,
                
            LiveSessionEvent.RUNTIME_CONTEXT_UPDATED:
                RuntimeContextUpdated
        }

    def get_payload_type(
        self,
        event: LiveSessionEvent,
    ) -> type[BaseModel]:
        payload = self._mappings.get(event)
        if payload is None:
            raise ValueError(
                f"No payload type registered for event {event.value}"
            )
            
        return self._mappings[event]