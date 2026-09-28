import uuid

from events.enums import LiveSessionEvent
from events.event_publisher import EventPublisher
from events.payloads import CandidateTurnCompleted, InterviewerTurnCompleted
from interview.models import UserTurnCompletedPayload

class InterviewCoordinator:
    def __init__(
        self,
        publisher: EventPublisher,
    ) -> None:
        self._publisher = publisher
    
    async def on_user_turn_complete(
        self,
        data: UserTurnCompletedPayload
    ):
        candidate_turn_id = uuid.uuid4()
        interviewer_turn_id = uuid.uuid4()
        fields_to_pass = {"session_id", "participant_id", }
        if data.role == "candidate":
            await self._publisher.publish(
                LiveSessionEvent.CANDIDATE_TURN_COMPLETED,
                CandidateTurnCompleted(
                    turn_id=candidate_turn_id,  
                    content=data.transcript,
                    **data.model_dump(include=fields_to_pass),
                )
            )
        elif data.role == "interviewer":
            await self._publisher.publish(
                LiveSessionEvent.INTERVIEWER_TURN_COMPLETED,
                InterviewerTurnCompleted(
                    turn_id=interviewer_turn_id,
                    content=data.transcript,
                    **data.model_dump(include=fields_to_pass)
                )
            )
        else:
            raise ValueError(f"Unknown role: {data.role}")