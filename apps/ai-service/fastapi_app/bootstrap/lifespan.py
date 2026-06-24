from contextlib import asynccontextmanager
from fastapi import FastAPI
from core.startup import (
    init_infra,
)
from infrastructure import get_logger


@asynccontextmanager 
async def lifespan(app : FastAPI):
    await init_infra()
    logger = get_logger(__name__)
    logger.info(f"fastapi service started", service = "knowledge-checker-ai-service")
    yield
    logger.info(f"fastapi service shutting down", service = "knowledge-checker-ai-service")
