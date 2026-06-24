from typing import cast
from infrastructure import get_logger
from graph.dependencies import (
    node_db_session,
    get_evaluation_service,
    get_turn_repo,
)
from models import (
    InterviewGraphState,
    Speaker,
    TurnEvaluation,
    CreateTurn,
    ContentType,
)

logger = get_logger(__name__)

async def evaluator_node(state : InterviewGraphState) -> dict:
    if state.questions_asked == 0:
        return {}
    
    logger.info(
        "evaluator node start",
        session_id = state.session_id,
    )
    evaluation_service = get_evaluation_service()
    
    evaluation = await evaluation_service.evaluate_turn(
        topic_type=state.topic_type,
        session_brief=state.session_brief,
        domain=state.domain,
        difficulty=state.current_difficulty,
        ai_strictness=state.ai_strictness,
        custom_instructions=state.custom_instructions,
        question=state.current_question,
        answer=state.user_transcript,
        active_context=state.active_context,
    )
    ev = cast(TurnEvaluation, evaluation)
    
    async with node_db_session() as session:
        turn_repo = get_turn_repo(session)
        turn_id = await turn_repo.create_turn(
            session_id=state.session_id,
            turn=CreateTurn(
                turn_number=state.turn_number,
                speaker=Speaker.USER,
                content=state.user_transcript or "",
                content_type=ContentType.ANSWER,
                user_audio_duration_sec=state.user_audio_duration_sec,
            )
        )
        logger.info(
            "turn is created into database",
            speaker = str(Speaker.USER),
            turn_id=turn_id,
            session_id = state.session_id,
        )
    new_overall_score = evaluation_service.compute_running_score(
        previous_overall=state.overall_score,
        previous_count=state.questions_asked,
        new_score=ev.evaluation_score,
    )
    new_active_context = state.active_context + (
        f"\ncandidate:{state.user_transcript}"
    )
    logger.info("evaluator node completed", session_id = state.session_id)
    return {
        "evaluation_score" : ev.evaluation_score,
        "evaluation_feedback" : ev.evaluation_feedback,
        "evaluation_rubric" : ev.evaluation_rubric.model_dump(),
        "previous_score" : ev.evaluation_score,
        "overall_score" : new_overall_score,
        "active_context" : new_active_context,
    }
    
    