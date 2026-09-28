
from events.payloads import (
    CandidateTurnUpdated,
    RuntimeContextUpdated,
)
from pydantic import BaseModel
from stream_worker.payloads import CreateTurnEventPayload
from stream_worker.stream_events import StreamEvent

class StreamEventRegistry:

    _mappings : dict[
            StreamEvent,
            type[BaseModel],
        ] = {
            StreamEvent.CREATE_TURN_EVENT:
                CreateTurnEventPayload,
                            
            StreamEvent.UPDATE_CANDIDATE_TURN_EVENT:
                CandidateTurnUpdated,
                            
            StreamEvent.RUNTIME_CONTEXT_UPDATED:
                RuntimeContextUpdated
        }

    @classmethod
    def get_payload_type(
        cls,
        event: StreamEvent,
    ) -> type[BaseModel]: 
        payload_type = cls._mappings.get(event)
        if payload_type is None:
            raise ValueError(
                f"No payload type registered for event {event.value}"
            )
        return payload_type
    
    @classmethod
    def deserialize_payload(
        cls,
        event: StreamEvent,
        raw_payload: str,
    ) -> BaseModel:
        payload_type = cls.get_payload_type(event)
        
        return payload_type.model_validate_json(raw_payload)