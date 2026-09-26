from uuid import UUID

from livekit.agents import (
    Agent,
    ChatContext,
    ChatMessage,
    StopResponse,
)
from interview.models import UserTurnCompletedPayload
from lib.logging.logging import get_logger
from livekit_worker.interview_agent_registry import InterviewAgentRegistry
from livekit_worker.models import ParticipantMetadata
from interview.factory import get_interview_coordinator

logger = get_logger(__name__)

class InterviewAgent(Agent):
    def __init__(
        self, 
        session_id: UUID,
        metadata: ParticipantMetadata,
        participant_id: str,
        agent_registry: InterviewAgentRegistry,
    ):
        super().__init__(instructions="")
        self.session_id = session_id
        self._room_metadata = metadata
        self.participant_id = participant_id
        self._agent_registry = agent_registry
        
    async def on_user_turn_completed(
        self, 
        turn_ctx: ChatContext, 
        new_message: ChatMessage
    ) -> None:
        transcript = new_message.text_content
        if not transcript:
            raise StopResponse()
        
        logger.info("turn_completed", session_id=self.session_id, transcript_length=len(transcript))
        
        coordinator = get_interview_coordinator(
            self._agent_registry
        )
        await coordinator.on_user_turn_complete(UserTurnCompletedPayload(
            transcript=transcript,
            session_id=self.session_id,
            participant_id=self.participant_id,
            role=self._room_metadata.role
        ))
        
    async def handle_interviewer_response(
        self,
        response: str,
    ):
        await self.session.say(response)
