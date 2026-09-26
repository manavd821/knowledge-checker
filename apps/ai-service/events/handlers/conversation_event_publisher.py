from pydantic import BaseModel

from events.enums import HandlerPolicy, LiveSessionEvent
from events.handlers.base import IEventHandler
from events.streams import StreamNames
from lib.logging.logging import get_logger
from lib.redis.stream.base import IRedisStream

logger = get_logger(__name__)
class ConversationEventPublisher(IEventHandler):

    def __init__(
        self,
        redis_stream: IRedisStream,
    ):
        self._redis_stream = redis_stream

    @property 
    def policy(self) -> HandlerPolicy:
        return HandlerPolicy.CRITICAL

    async def handle(
        self,
        event: LiveSessionEvent,
        payload: BaseModel,
    ) -> None:
        try:
            # await self._redis_stream.add(
            #     StreamNames.CONVERSATION_EVENTS,
            #     payload.model_dump(mode="json"),
            # )
            return
            
        
        except Exception as e:
            logger.error("Failed to publish conversation event to Redis stream", exc_info=e)
            raise