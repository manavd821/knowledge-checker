from typing import Any

from lib.redis.cache.base import IRedisDB
from models.sessions import SessionContext
from exceptions.CacheMissError import CacheMissError

class ProcessorSessionContextCache:
    _KEY_PREFIX = "processor_session_runtime"

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

    async def set_session(
        self,
        session_id: str,
        data: SessionContext,
        ttl_seconds: int,
    ) -> None:
        await self._redis.set(
            self._key(session_id),
            data.model_dump(),
            ttl_seconds,
        )

    async def get(
        self,
        session_id: str,
    ) -> SessionContext | None:
        data =  await self._redis.get(
            self._key(session_id)
        )
        if not data:
            return
        return SessionContext.model_validate(data)

    async def update(
        self,
        session_id: str,
        update: dict[str, Any],
        ttl_seconds: int,
    ) -> None:
        key = self._key(session_id)

        current = await self._redis.get(key)

        if current is None:
            raise CacheMissError(
                f"Session context not found: {session_id}"
            )

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