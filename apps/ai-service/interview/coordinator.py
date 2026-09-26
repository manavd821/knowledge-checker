import uuid

from events.bus import EventBus
from events.enums import LiveSessionEvent
from events.payloads import CandidateTurnCompleted, InterviewerTurnCompleted
from interview.models import UserTurnCompletedPayload

class InterviewCoordinator:
    def __init__(
        self,
        bus: EventBus,
    ) -> None:
        self._bus = bus
    
    async def on_user_turn_complete(
        self,
        data: UserTurnCompletedPayload
    ):
        turn_id = uuid.uuid4()
        fields_to_pass = {"session_id", "transcript", "participant_id", }
        if data.role == "candidate":
            await self._bus.publish(
                LiveSessionEvent.CANDIDATE_TURN_COMPLETED,
                CandidateTurnCompleted(
                    turn_id=turn_id,   
                    **data.model_dump(include=fields_to_pass),
                )
            )
        elif data.role == "interviewer":
            await self._bus.publish(
                LiveSessionEvent.INTERVIEWER_TURN_COMPLETED,
                InterviewerTurnCompleted(
                    turn_id=str(turn_id),
                    **data.model_dump(include=fields_to_pass)
                )
            )
        else:
            raise ValueError(f"Unknown role: {data.role}")