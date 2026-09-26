
from functools import lru_cache

import redis.asyncio as redis

from config.settings import get_settings

@lru_cache
def get_redis_client():
    settings = get_settings()
    redis_client = redis.from_url(
        settings.REDIS_URL,
        decode_responses = True,
        max_connections = 20,
    )
    return redis_client
    
async def close_redis_client(redis: redis.Redis):
    await redis.aclose()