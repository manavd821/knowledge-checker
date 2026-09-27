
from functools import lru_cache

from lib.redis.factory import get_stream_redis_cloud
from stream_worker.stream_event_registry import StreamEventRegistry
from stream_worker.stream_worker import RedisStreamWorker
from stream_worker.handlers.turn_handler import TurnHandler
from stream_worker.stream_event_router import StreamEventRouter
from stream_worker.stream_events import StreamEvent
from redis.asyncio import Redis


@lru_cache
def build_event_router() -> StreamEventRouter:
    router = StreamEventRouter()
    
    router.register(
        StreamEvent.CANDIDATE_TURN_COMPLETED,
        TurnHandler()
    )
    
    return router

def get_stream_event_registry():
    return StreamEventRegistry()

def get_redis_worker(client: Redis) -> RedisStreamWorker:
    stream = get_stream_redis_cloud(client)
    router = build_event_router()
    registry = get_stream_event_registry()
    
    return RedisStreamWorker(
        stream=stream,
        router = router,
        registry=registry,
        stream_key="knowledge-checker-worker-key",
        group="knowledge-checker-worker-group",
        consumer="knowledge-checker-worker-consumer",
    )