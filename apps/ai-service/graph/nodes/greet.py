from infrastructure import get_logger
from models import (
    InterviewGraphState,
    ContentType,
)

logger = get_logger(__name__)

async def greet_node(state : InterviewGraphState) -> dict:
    logger.info(
        "greet node start",
        session_id = state.session_id,
    )
    ai_greet = "Welcome to the session."
    content_type = ContentType.GREETING
    
    logger.info(
        "greet node completed",
        session_id = state.session_id,
    )
    return{
        "ai_greet" : ai_greet,
        "content_type" : content_type,
    }