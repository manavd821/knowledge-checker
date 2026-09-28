
from functools import lru_cache
import uuid

from lib.redis.factory import get_stream_redis_cloud
from services.factory import get_session_runtime_ctx_service, get_turn_service
from stream_worker.handlers.create_turn import CreateTurnHandler
from stream_worker.handlers.update_candidate_turn import UpdateCandidateTurnHandler
from stream_worker.handlers.update_runtime_context import UpdateRuntimeContextHandler
from stream_worker.stream_worker import RedisStreamWorker
from stream_worker.stream_event_router import StreamEventRouter
from stream_worker.stream_events import StreamEvent
from redis.asyncio import Redis
from stream_worker.enums import (
    CONVERSATION_STREAM_KEY,
    CONVERSATION_CONSUMER_GROUP,
)

@lru_cache
def build_event_router() -> StreamEventRouter:
    router = StreamEventRouter()
    turn_service = get_turn_service()
    runtime_context_service = get_session_runtime_ctx_service()
    router.register(
        StreamEvent.CREATE_TURN_EVENT,
        CreateTurnHandler(turn_service)
    )
    router.register(
        StreamEvent.UPDATE_CANDIDATE_TURN_EVENT,
        UpdateCandidateTurnHandler(turn_service)
    )
    router.register(
        StreamEvent.RUNTIME_CONTEXT_UPDATED,
        UpdateRuntimeContextHandler(runtime_context_service)
    )
    
    return router


def get_redis_worker(client: Redis) -> RedisStreamWorker:
    stream = get_stream_redis_cloud(client)
    router = build_event_router()
    
    return RedisStreamWorker(
        stream=stream,
        router = router,
        stream_key=CONVERSATION_STREAM_KEY,
        group=CONVERSATION_CONSUMER_GROUP,
        consumer=f"worker-{uuid.uuid4()}",
    )