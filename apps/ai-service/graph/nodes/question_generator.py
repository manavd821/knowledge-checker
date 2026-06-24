from infrastructure import get_logger
from graph.dependencies import (
    get_question_service,
)
from models import (
    InterviewGraphState,
    ContentType,
)

logger = get_logger(__name__)

async def question_generator_node(state : InterviewGraphState) -> dict:
    logger.info(
        "question generator node start",
        session_id = state.session_id,
    )
    question_service = get_question_service()
    new_question = await question_service.generate_question(
        topic_type=state.topic_type,
        domain=state.domain,
        current_difficulty=state.current_difficulty,
        ai_strictness=state.ai_strictness,
        fundamental_phase=state.fundamental_phase,
        session_brief=state.session_brief,
        custom_instructions=state.custom_instructions,
        overall_score=state.overall_score,
        previous_score=state.previous_score,
        active_context=state.active_context,
    )
    logger.info(
        "question generator node completed",
        session_id = state.session_id,
    )
    return {
        "next_question" : new_question,
        "content_type" : ContentType.QUESTION,
    }
    
    