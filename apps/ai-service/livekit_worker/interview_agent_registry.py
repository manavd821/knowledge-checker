from typing import TYPE_CHECKING
from uuid import UUID
from livekit_worker.agent import InterviewAgent
    
class InterviewAgentRegistry:
    def __init__(self):
        self._agents: dict[UUID, InterviewAgent] = {}

    def register(self, session_id: UUID, agent: InterviewAgent) -> None:
        self._agents[session_id] = agent

    def get(self, session_id: UUID) -> InterviewAgent:
        try:
            return self._agents[session_id]
        except KeyError:
            raise RuntimeError(
                f"InterviewAgent not found for session: {session_id}"
            )

    def remove(self, session_id: UUID) -> None:
        self._agents.pop(session_id, None)