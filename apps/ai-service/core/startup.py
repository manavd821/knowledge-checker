from core.singletons import (
    get_database,
    get_redis_client,
)

async def check_infra_health():
    db = get_database()
    redis = get_redis_client()
    await redis.healthcheck()
    await db.healthcheck()
