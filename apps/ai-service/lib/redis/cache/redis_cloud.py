import json
from typing import Any

from redis.asyncio import Redis

from lib.redis.cache.base import IRedisDB


class CacheRedisCloud(IRedisDB):

    def __init__(
        self,
        client: Redis,
    ):
        self._client = client

    async def healthcheck(self) -> None:
        assert await self._client.ping() == True # type: ignore

    async def set(
        self,
        key: str,
        data: Any,
        ttl_seconds: int,
    ) -> None:
        await self._client.set(
            key,
            json.dumps(data, default=str),
            ex=ttl_seconds,
        )

    async def get(
        self,
        key: str,
    ) -> Any:
        data = await self._client.get(key)

        if data is None:
            return None

        return json.loads(data)

    async def exists(
        self,
        key: str,
    ) -> bool:
        return bool(
            await self._client.exists(key)
        )

    async def hset(
        self,
        key: str,
        data: dict[str, Any],
        ttl_seconds: int,
    ) -> bool:
        serialized_data = {
            field: json.dumps(value)
            for field, value in data.items()
        }

        await self._client.hset(
            key,
            mapping=serialized_data,
        ) # type: ignore

        await self._client.expire(
            key,
            ttl_seconds,
        )

        return True

    async def hgetall(
        self,
        key: str,
    ) -> dict[str, Any]:
        data = await self._client.hgetall(key) # type: ignore

        return {
            field: json.loads(value)
            for field, value in data.items()
        }

    async def delete(
        self,
        key: str,
    ) -> None:
        await self._client.delete(key)