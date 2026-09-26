from typing import cast

from pydantic import BaseModel

from events.enums import HandlerPolicy, LiveSessionEvent
from events.handlers.base import IEventHandler
from events.payloads import InterviewerResponseReady
from lib.logging.logging import get_logger
from livekit_worker.interview_agent_registry import InterviewAgentRegistry

logger = get_logger(__name__)
class InterviewerResponseReadyHandler(IEventHandler):
    
    def __init__(
        self,
        agent_registry: InterviewAgentRegistry
    ) -> None:
        self._agent_registry = agent_registry
        
    @property 
    def policy(self) -> HandlerPolicy:
        return HandlerPolicy.CRITICAL

    async def handle(
        self,
        event: LiveSessionEvent,
        payload: BaseModel,
    ) -> None:
        if not isinstance(payload, InterviewerResponseReady):
            raise ValueError(f"Invalid payload type: {type(payload)}")
        
        agent = self._agent_registry.get(payload.session_id)
        await agent.handle_interviewer_response(payload.response)