from typing import Any
from uuid import UUID

from lib.redis.cache.base import IRedisDB


class TurnCache:

    _KEY_PREFIX = "turn"

    def __init__(
        self,
        redis: IRedisDB,
    ):
        self._redis = redis

    def _key(
        self,
        session_id: UUID,
    ) -> str:
        return f"{self._KEY_PREFIX}:{session_id}"

    async def set_turn_state(
        self,
        session_id: UUID,
        data: dict[str, Any],
        ttl_seconds: int,
    ) -> None:
        await self._redis.set(
            self._key(session_id),
            data,
            ttl_seconds,
        )

    async def get_turn_state(
        self,
        session_id: UUID,
    ) -> dict[str, Any] | None:
        return await self._redis.get(
            self._key(session_id)
        )

    async def update_turn_state(
        self,
        session_id: UUID,
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
        session_id: UUID,
    ) -> None:
        await self._redis.delete(
            self._key(session_id)
        )