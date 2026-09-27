from typing import Any
import json
from uuid import UUID
from lib.redis.cache.base import IRedisDB
from models.session_runtime_context import SelectSessionRuntimeContext


class SessionRuntimeContextCache:
    _KEY_PREFIX = "session_runtime_context"
    def __init__(
        self,
        redis: IRedisDB
    ) -> None:
        self._redis = redis
    
    def _key(self, session_id: str) -> str:
        return f"{self._KEY_PREFIX}:{session_id}"

    async def get(self, session_id: str) -> SelectSessionRuntimeContext | None:
        data = await self._redis.get(
                    self._key(session_id)
                )
        if not data:
            return
        return SelectSessionRuntimeContext.model_validate(data)
    
    async def set(
            self,
            session_id: str,
            data: SelectSessionRuntimeContext,
            ttl_seconds: int,
        ) -> None:
            await self._redis.set(
                self._key(session_id),
                data.model_dump(mode="json"),
                ttl_seconds,
            )
        
    async def update_session(
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