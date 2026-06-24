from infrastructure import get_logger
from graph.dependencies import (
    get_hint_service,
)
from models import (
    InterviewGraphState,
    ContentType,
)

logger = get_logger(__name__)

async def hint_generator_node(state : InterviewGraphState) -> dict:
    if not state.ai_hints_enabled:
        return {}
    
    
    logger.info(
        "hint generator node start",
        session_id = state.session_id,
    )
    hint_service = get_hint_service()
    hint = await hint_service.generate_hint(
        topic_type=state.topic_type,
        current_difficulty=state.current_difficulty,
        ai_strictness=state.ai_strictness,
        session_brief=state.session_brief,
        custom_instructions=state.custom_instructions,
        current_question=state.current_question,
        user_transcript=state.user_transcript,
        active_context=state.active_context,
        domain=state.domain
    )
    
    logger.info(
        "hint generator node completed",
        session_id = state.session_id,
    )
    return {
        "ai_hint" : hint,
        "content_type" : ContentType.HINT,
    }
    
    