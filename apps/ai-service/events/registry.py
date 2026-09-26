
from events.enums import LiveSessionEvent
from events.payloads import (
    CandidateTurnCompleted,
    InterviewerTurnCompleted,
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
        }

    def get_payload_type(
        self,
        event: LiveSessionEvent,
    ) -> type[BaseModel]:
        return self._mappings[event]