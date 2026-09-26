from pydantic import BaseModel

from events.bus import EventBus
from events.enums import LiveSessionEvent


class EventPublisher:

    def __init__(self, bus: EventBus):
        self._bus = bus


    async def publish(
        self,
        event: LiveSessionEvent,
        payload: BaseModel,
    ) -> None:
        if self._bus is None:
            raise RuntimeError("Event bus not initialized")

        await self._bus.publish(event, payload)