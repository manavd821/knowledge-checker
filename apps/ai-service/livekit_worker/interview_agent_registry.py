from uuid import UUID
from livekit_worker.interview_agent_like import InterviewAgentLike
    
class InterviewAgentRegistry:
    
    _agents : dict[UUID, "InterviewAgentLike"] = {}

    @classmethod
    def register(cls, session_id: UUID, agent) -> None:
        cls._agents[session_id] = agent

    @classmethod
    def get(cls, session_id: UUID):
        try:
            return cls._agents[session_id]
        except KeyError:
            raise RuntimeError(
                f"InterviewAgent not found for session: {session_id}"
            )
    @classmethod
    def remove(cls, session_id: UUID) -> None:
        cls._agents.pop(session_id, None)