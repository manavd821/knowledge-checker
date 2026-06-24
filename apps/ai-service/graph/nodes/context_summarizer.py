from infrastructure import get_logger
from models import (
    InterviewGraphState,
)
from graph.dependencies import (
    node_db_session,
    get_context_service,
    get_session_context_repo
)

logger = get_logger(__name__)
async def context_summarizer_node(state : InterviewGraphState) -> dict:
    logger.info(
        "context summarizer node start",
        session_id = state.session_id,
    )
    context_service = get_context_service()
    async with node_db_session() as session:
        session_context_repo = get_session_context_repo(session)
        active_context = await context_service.summarize_and_update(
            state.session_id,
            active_context=state.active_context,
            repo = session_context_repo,
        )
    logger.info(
        "context summarizer node completed",
        session_id = state.session_id,
    )
    return {
        "active_context" : active_context,
    }