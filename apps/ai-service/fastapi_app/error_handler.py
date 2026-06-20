from fastapi import Request
from exceptions.base import AppError
from fastapi.responses import JSONResponse
from infrastructure import get_logger

logger = get_logger(__name__)

async def global_exception_handler(request : Request, exc):
    if isinstance(exc, AppError):
        payload = {
            "code" : exc.code,
            "status_code" : exc.status_code,
        }
        if exc.expose:
            payload["details"] = exc.details
            payload["message"] = exc.message
            logger.info(
                f"client error: {str(exc)}",
                error = exc.message,
                error_type = type(exc).__name__,
            )
        else: # server error
            logger.error(
                f"server error: {str(exc)}",
                error = exc.message,
                error_type = type(exc).__name__,
            )
        
        return JSONResponse(
            payload,
            status_code=exc.status_code
        )
    
    logger.critical(
        f"unhandled error: {str(exc)}",
        error = str(exc),
        error_type = type(exc).__name__,
    )
    return JSONResponse(
        {
            "code" : "INTERNAL_SERVER_ERROR",
            "message" : "something went wrong. Please try again later",
        },
        status_code=500,
    )