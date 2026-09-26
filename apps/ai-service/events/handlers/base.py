from abc import ABC, abstractmethod
from pydantic import BaseModel

from events.enums import HandlerPolicy, LiveSessionEvent


class IEventHandler(ABC):
    
    @property
    @abstractmethod
    def policy(self) -> HandlerPolicy:
        raise NotImplementedError

    @abstractmethod
    async def handle(
        self,
        event: LiveSessionEvent,
        payload: BaseModel,
    ) -> None:
        raise NotImplementedError