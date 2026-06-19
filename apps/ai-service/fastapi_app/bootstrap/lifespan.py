from contextlib import asynccontextmanager
from fastapi import FastAPI
from config.settings import get_settings
from infrastructure import (
    configure_logging,
    get_logger,
)
from core.startup import (
    check_infra_health,
)


@asynccontextmanager 
async def lifespan(app : FastAPI):
    configure_logging()
    logger = get_logger(__name__)
    logger.info("fastapi_starting", service="knowledge-checker-ai-service")
    
    get_settings()
    
    await check_infra_health()
    
    yield
    logger.info("fastapi_shutting_down")