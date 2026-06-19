from fastapi import Request, Response
from fastapi_app.infrastructure import get_logger
import structlog
import uuid
import time

logger = get_logger(__name__)

async def logging_middlware(req : Request, call_next):
    structlog.contextvars.clear_contextvars()
    
    req_id = req.headers.get("X-Request-ID", str(uuid.uuid4()))
    
    structlog.contextvars.bind_contextvars(
        req_id = req_id,
        http_method=req.method,
        path = req.url.path,
    )
    start = time.perf_counter()
    try:
        response : Response = await call_next(req)
    except Exception:
        logger.exception("request_failed")
        raise
    
    duration_ms = round((time.perf_counter() - start) * 1000, 2)
    logger.info(
        "request completed",
        status_code=response.status_code,
        duration_ms=duration_ms,
    ) 
    response.headers["X-Request-ID"] = req_id
    return response