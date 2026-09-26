
from functools import lru_cache
from uuid import UUID

from livekit_worker.agent import InterviewAgent
from livekit_worker.models import ParticipantMetadata
from livekit_worker.interview_agent_registry import InterviewAgentRegistry

@lru_cache
def get_interview_agent_registry():
    return InterviewAgentRegistry()

def create_interview_agent(
    session_id: UUID,
    metadata: ParticipantMetadata,
    participant_id: str,
) -> InterviewAgent:
    agent_registry=get_interview_agent_registry()
    agent = InterviewAgent(
        session_id=session_id,
        metadata=metadata,
        participant_id=participant_id,
        agent_registry=agent_registry,
    )
    
    agent_registry.register(
        session_id,
        agent
    )
    return agent