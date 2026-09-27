from lib.logging.logging import get_logger
from lib.redis.stream.base import IRedisStream
from stream_worker.stream_event_router import StreamEventRouter
from stream_worker.stream_events import StreamEvent
from stream_worker.stream_event_registry import StreamEventRegistry

logger = get_logger(__name__)

class RedisStreamWorker:
    def __init__(
        self,
        stream: IRedisStream,
        router: StreamEventRouter,
        registry: StreamEventRegistry,
        stream_key: str,
        group: str,
        consumer: str,
    ) -> None:
        self._stream = stream
        self._router = router
        self._registry = registry
        self._stream_key = stream_key
        self._group = group
        self._consumer = consumer

        self._running = True

    async def run(self):
        while self._running:
            
            messages = await self._stream.read_group(
                key=self._stream_key,
                group=self._group,
                consumer=self._consumer,
            )
            
            for _, entries in messages:
                for message_id, fields in entries:
                    await self._process_message(
                        message_id=message_id,
                        fields=fields,
                    )
    
    async def _process_message(
        self,
        message_id: str,
        fields: dict,
    ):
        try:
            event = StreamEvent(fields["event"])
            payload = self._registry.deserialize_payload(
                event=event,
                raw_payload=fields["payload"],
            )
            
            await self._router.handle_together(
                event,
                payload,
            )
            
            await self._stream.ack(
                self._stream_key,
                self._group,
                message_id,
            )
        except Exception:
            logger.exception(
                "Failed to process stream message",
                extra={
                    "stream": self._stream_key,
                    "message_id": message_id,
                },
            )