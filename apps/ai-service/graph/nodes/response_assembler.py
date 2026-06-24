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

async def response_assembler_node(state : InterviewGraphState) -> dict:
    logger.info(
        "response assembler node start",
        session_id = state.session_id,
    )    
    match state.content_type:
        case ContentType.HINT:
            final_response = state.ai_hint
        case ContentType.QUESTION:
            final_response = state.next_question
        case ContentType.GREETING:
            final_response = state.ai_greet
        case ContentType.FEEDBACK:
            final_response = state.evaluation_feedback
        case _:
            raise ValueError(f"Unknown content type: {state.content_type}")
    
    # AI turn row in turn table
    async with node_db_session() as session:
        turn_repo = get_turn_repo(session)
        turn_id = await turn_repo.create_turn(
            session_id=state.session_id,
            turn = CreateTurn(
                turn_number=state.turn_number,
                speaker=Speaker.AI,
                content = final_response or "",
                content_type=state.content_type,
            )
        )
        logger.info(
            "turn is created in database",
            speaker = str(Speaker.AI),
            turn_id=turn_id,
            session_id = state.session_id,
        )
    
    new_turn_number = state.turn_number + 1
    new_questions_asked = state.questions_asked + (state.content_type == ContentType.QUESTION) 
    new_current_question = state.next_question
    FUNDAMENTAL_COUNT = 4
    if state.fundamental_phase and new_questions_asked >= FUNDAMENTAL_COUNT:
        new_fundamental_phase = False
    else:
        new_fundamental_phase = state.fundamental_phase
    
    cache_repo = get_cache_repo()
    await cache_repo.set_turn_state(
        session_id=state.session_id,
        data=TurnState(
            current_turn_number=new_turn_number,
            current_difficulty=state.current_difficulty,
            overall_score_running=state.overall_score,
            previous_score=state.previous_score,
            fundamental_phase=new_fundamental_phase,
            questions_asked_count=new_questions_asked,
        ),
        ttl_seconds=(state.duration_minutes or 0 + 30) * 60
    )
    # append current turn into active context
    new_active_context = state.active_context 
    if state.content_type == ContentType.HINT:
        new_active_context += f"\nhint provided to user by interviewer : {final_response}"
    elif state.content_type == ContentType.QUESTION:
        new_active_context += f"\nInterviewer : {final_response}"
    elif state.content_type == ContentType.GREETING:
        new_active_context += f"\nInterviewer : {final_response}"
    
    logger.info(
            "response assembler node completed",
            session_id = state.session_id,
        )
    logger.info(
            f"new turn number:{new_turn_number}",
            session_id = state.session_id,
        )
    return {
        "final_response" : final_response,
        "turn_number" : new_turn_number,
        "fundamental_phase" : new_fundamental_phase,
        "questions_asked" : new_questions_asked,
        "current_question" : new_current_question,
        "active_context" : new_active_context,
    }
    
    