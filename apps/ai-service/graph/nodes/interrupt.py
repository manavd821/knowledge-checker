from datetime import datetime, UTC
from langgraph.types import interrupt
from infrastructure import get_logger
from graph.dependencies import (
    get_cache_repo,
    node_db_session,
    get_turn_repo,
)
from models import (
    InterviewGraphState,
    Speaker,
    CreateTurn,
    ContentType,
    TurnState,
)
logger = get_logger(__name__)

async def interrupt_node(state : InterviewGraphState) -> dict:
    logger.info(
        "interrupt node start",
        session_id = state.session_id,
    )    
    user_transcript = interrupt({
        "final_response" : state.final_response,
        "content_type" : state.content_type,
    })
    
    logger.info(
            "interrupt node completed",
            session_id = state.session_id,
        )
    
    return {
        "user_transcript" : user_transcript,
    }
    
    
    