from core.singletons import (
    get_database,
    get_redis_client,
)
from infrastructure import (
    configure_logging,
)
from config.settings import get_settings
from functools import lru_cache

async def check_infra_health():
    db = get_database()
    redis = get_redis_client()
    await redis.healthcheck()
    await db.healthcheck()


async def init_infra():
    configure_logging()
    get_settings()
    await check_infra_health()