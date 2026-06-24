from typing import cast
from infrastructure import get_logger
from graph.dependencies import (
    get_cache_repo,
    node_db_session,
    get_turn_repo,
    get_session_repo,
)
from models import (
    InterviewGraphState,
    Speaker,
    CreateTurn,
    ContentType,
    TurnState,
    STATUS,
)
from datetime import datetime, UTC

logger = get_logger(__name__)

async def session_terminator_node(state : InterviewGraphState) -> dict:
    logger.info(
        "session terminator node start",
        session_id = state.session_id,
    )
    
    # mark session completed
    async with node_db_session() as session:
        session_repo = get_session_repo(session)
        await session_repo.update_session_status(
            session_id=state.session_id,
            status = STATUS.COMPLETED,
            ended_at = datetime.now(tz=UTC),
        )
        
    # background worker task: whole session feedback
    # will do later
    cache_repo = get_cache_repo()
    try:
        await cache_repo.delete_session_keys(state.session_id)
    except Exception:
        logger.exception(
        "Failed to delete session cache",
        session_id=state.session_id,
    )
    logger.info(
        "session terminator node completed",
        session_id = state.session_id,
    )
    return {
        "is_session_complete" : True,
        "final_response" : "Your interview session has been completed. Thank you for participating."
    }
    
    