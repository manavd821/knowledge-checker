from models import InterviewGraphState
from infrastructure import get_logger
from graph.dependencies import (
    get_token_service,
    get_context_service,
)

logger = get_logger(__name__)

async def transcript_analyzer_node(state : InterviewGraphState) -> dict:
    logger.info(
        "transcript analyzer node start",
        session_id = state.session_id,
    )
    token_service = get_token_service()
    context_service = get_context_service()
    
    transcript_tokens = token_service.estimate_tokens(state.user_transcript)
    context_tokens = token_service.estimate_tokens(state.active_context)
    need_summerization = context_service.decide_context_action(context_tokens)
    logger.info(
        "transcript analyzer node completed",
        session_id = state.session_id,
    )
    return {
        "transcript_tokens" : transcript_tokens,
        "context_tokens" : context_tokens,
        "need_summerization" : need_summerization,
    }