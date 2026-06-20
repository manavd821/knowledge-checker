from upstash_redis import AsyncRedis
from infrastructure.logging import get_logger

logger = get_logger(__name__)
class RedisClient:
    """Holds the Upstash Redis connection. One instance for the app"""
    def __init__(self, connection_string : str, connection_token : str) -> None:
        self._redis = AsyncRedis(
            url = connection_string,
            token = connection_token,
        )
    
        logger.info("Redis client created")
    
    @property
    def client(self):
        """Expose the raw Upstash client directly."""
        return self._redis
    
    async def healthcheck(self):
        assert await self._redis.ping() == "PONG"
        logger.info("Upstash Redis db is healthy")