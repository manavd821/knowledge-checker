from redis.asyncio import Redis

from lib.redis.stream.base import IRedisStream


class StreamRedisCloud(IRedisStream):
    def __init__(
        self,
        client: Redis
    ):
        self._client = client
        
    async def add(
        self,
        key: str,
        fields: dict
    ):
        return await self._client.xadd(
            key,
            fields
        )
    
    async def read_group(
        self,
        key: str,
        group: str,
        consumer: str,
        count: int = 10,
        block: int = 5000,
    ):
        return await self._client.xreadgroup(
            groupname=group,
            consumername=consumer,
            streams={key: ">"},
            count=count,
            block=block,
        )

    async def ack(
        self,
        key: str,
        group: str,
        message_id: str,
    ):
        return await self._client.xack(
            key,
            group,
            message_id,
        )