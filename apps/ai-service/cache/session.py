from typing import Any

from lib.redis.cache.base import IRedisDB
from models.sessions import SelectSession


class SessionCache:

    _KEY_PREFIX = "session"

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
        data: SelectSession,
        ttl_seconds: int,
    ) -> None:
        await self._redis.set(
            self._key(session_id),
            data.model_dump(mode="json"),
            ttl_seconds,
        )

    async def get_session(
        self,
        session_id: str,
    ) -> SelectSession | None:
        data =  await self._redis.get(
            self._key(session_id)
        )
        if not data:
            return
        return SelectSession.model_validate(data)

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