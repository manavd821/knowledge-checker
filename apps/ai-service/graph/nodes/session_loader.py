from exceptions.domain import SessionNotFoundError
from infrastructure import get_logger
from models import InterviewGraphState, STATUS
from graph.dependencies import (
    get_cache_repo,
    node_db_session,
    get_session_repo,
)
from models.sessions import SessionMeta
from datetime import datetime, UTC

logger = get_logger(__name__)
async def session_loader_node(state : InterviewGraphState) -> dict:
    logger.info(
        "session loader start",
        session_id=state.session_id,
    )
    cache_repo = get_cache_repo()
    session_meta = await cache_repo.get_session_meta(state.session_id)
    if session_meta is None:
        logger.info("session metadata cache miss")
        async with node_db_session() as session:
            session_repo = get_session_repo(session)
            session_data = await session_repo.get_session_by_id(state.session_id)
            if not session_data:
                logger.warning(
                    "session not found",
                    session_id=state.session_id,
                )
                raise SessionNotFoundError(session_id=state.session_id)
            logger.info(
                "session data loaded from database",
                session_id=state.session_id,
            )
            started_at = session_data.started_at
            if started_at is None or session_data.status != STATUS.ACTIVE:
                # mark started_at
                started_at = datetime.now(tz=UTC)
                await session_repo.update_session_status(
                    session_id=state.session_id,
                    status=STATUS.ACTIVE,
                    started_at = started_at
                )
            logger.info(
                f"session status set '{str(STATUS.ACTIVE)}' in database",
                session_id=state.session_id,
            )
            session_meta = SessionMeta.model_validate(session_data)
            session_meta.started_at = started_at
            await cache_repo.set_session_meta(
                state.session_id,
                data = session_meta,
                ttl_seconds=(session_meta.duration_minutes + 30) * 60,
            )
    else:
        logger.info(
            "session metadata cache hit",
            session_id=state.session_id,
        )
    
    logger.info(
        "session loader completed",
        session_id=state.session_id,
        user_id=session_meta.user_id,
    )
    return {
        "user_id" : session_meta.user_id,
        "thread_id" : state.session_id,
        "session_brief" : session_meta.session_brief,
        "defined_difficulty" : session_meta.difficulty,
        "current_difficulty" : session_meta.difficulty,
        "ai_strictness" : session_meta.ai_strictness,
        "ai_hints_enabled" : session_meta.ai_hints_enabled,
        "topic_type" : session_meta.topic_type,
        "domain" : session_meta.domain,
        "custom_instructions" : session_meta.custom_instructions,
        "fundamental_phase" : True,
        "turn_number" : 0,
        "questions_asked" : 0,
        "overall_score" : None,
        "previous_score" : None,
        "active_context" : "",
        "duration_minutes" : session_meta.duration_minutes,
        "started_at" : session_meta.started_at,
    }