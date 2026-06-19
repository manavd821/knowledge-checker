from functools import lru_cache
from config.settings import get_settings
from infrastructure import (
    Database,
    RedisClient,
)

settings = get_settings()

@lru_cache
def get_database() -> Database:
    """Singleton — engine + sessionmaker built once"""
    return Database(settings.DATABASE_URL)

@lru_cache
def get_redis_client() -> RedisClient:
    return RedisClient(
        connection_string=settings.UPSTASH_REDIS_REST_URL,
        connection_token=settings.UPSTASH_REDIS_REST_TOKEN,
        )