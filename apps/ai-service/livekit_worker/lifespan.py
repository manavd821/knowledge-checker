
from livekit.agents import JobProcess

from config.settings import get_settings
from functools import lru_cache

from db.factory import get_database
from lib.logging.logging import configure_logging
from lib.redis.client import get_redis_client
from lib.redis.factory import get_cache_redis_cloud

def init_infra():
    configure_logging()
    get_settings()
    get_database()
    get_cache_redis_cloud()

async def clean_up():
    redis = get_redis_client()
    await redis.aclose() 