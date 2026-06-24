from infrastructure import get_logger
from models import (
    InterviewGraphState,
    Difficulty,
)
from graph.dependencies import get_difficulty_service

logger = get_logger(__name__)

async def difficulty_resolver_node(state : InterviewGraphState) -> dict:
    logger.info(
        "difficulty resolver node start",
        session_id = state.session_id
    )
    if state.fundamental_phase:
        logger.info(
            "difficulty resolver node completed",
            session_id = state.session_id,
            current_difficulty = str(Difficulty.EASY),
        )
        return {
            "current_difficulty" : Difficulty.EASY,
        }
    difficulty_service = get_difficulty_service()
    resolved_difficulty = difficulty_service.resolve_difficulty(
        defined_difficulty=state.defined_difficulty,
        overall_score=state.overall_score,
        previous_score=state.previous_score,
    )
    logger.info(
            "difficulty resolver node completed",
            session_id = state.session_id,
            current_difficulty = str(resolved_difficulty),
        )
    return {
        "current_difficulty" : resolved_difficulty,
    }
    