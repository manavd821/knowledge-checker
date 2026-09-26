from typing import Any

from lib.redis.cache.base import IRedisDB
from models.graph_state import InterviewGraphState


class GraphCache:
    _KEY_PREFIX = "graph"
    
    def __init__(
        self,
        redis: IRedisDB,
    ):
        self._redis = redis

    def _key(
        self,
        session_id: str,
    ) -> str:
        return f"{self._KEY_PREFIX}:{session_id}"

    async def set_graph_state(
        self,
        session_id: str,
        data: InterviewGraphState,
        ttl_seconds: int,
    ) -> None:
        await self._redis.set(
            self._key(session_id),
            data.model_dump(),
            ttl_seconds,
        )

    async def get_graph_state(
        self,
        session_id: str,
    ) -> InterviewGraphState | None:
        data =  await self._redis.get(
            self._key(session_id)
        )
        if not data:
            return
        return InterviewGraphState.model_validate(data)

    async def update_graph_state(
        self,
        session_id: str,
        update: dict[str, Any],
        ttl_seconds: int,
    ) -> None:
        key = self._key(session_id)

        current = await self._redis.get(key)

        if current is None:
            return

        current.update(update)
        await self._redis.set(
            key,
            current,
            ttl_seconds,
        )

    async def delete(
        self,
        session_id: str,
    ) -> None:
        await self._redis.delete(
            self._key(session_id)
        )