from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi_app.config.settings import get_settings
from fastapi_app.infrastructure import (
    configure_logging,
    get_logger,
)
from fastapi_app.core.singletons import (
    get_redis_client,
    get_database,
)

async def check_infra_health():
    db = get_database()
    redis = get_redis_client()
    await redis.healthcheck()
    await db.healthcheck()

@asynccontextmanager 
async def lifespan(app : FastAPI):
    configure_logging()
    logger = get_logger(__name__)
    logger.info("fastapi_starting", service="knowledge-checker-ai-service")
    
    get_settings()
    
    await check_infra_health()
    
    yield
    logger.info("fastapi_shutting_down")