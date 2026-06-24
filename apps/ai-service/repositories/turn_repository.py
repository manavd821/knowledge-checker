from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure import get_logger
from models.orm import Turn
from exceptions.infrastructure import DatabaseError
from models import (
    CreateTurn,
)
logger = get_logger(__name__)

class TurnRepository:
    def __init__(self, session : AsyncSession) -> None:
        self._session = session
        logger.debug("TurnRepository created")
        
    async def create_turn(
        self,
        session_id : str,
        turn : CreateTurn,
    ) -> str | None:
        payload = turn.model_dump(
            exclude={"turn_evaluation"}
        )
        if turn.turn_evaluation:
            payload.update({
                "evaluation_score": turn.turn_evaluation.evaluation_score,
                "evaluation_feedback": turn.turn_evaluation.evaluation_feedback,
                "evaluation_rubric": turn.turn_evaluation.evaluation_rubric.model_dump(),
                "difficulty_applied": turn.turn_evaluation.difficulty_applied,
            })
        new_turn = Turn(
            session_id=session_id,
            **payload,
        )
        self._session.add(new_turn)
        try:
            await self._session.flush()
        except SQLAlchemyError as e:
            raise DatabaseError(
                f"Failed to create turn '{session_id}'",
                code="SQLALCHEMY_ERROR",
            ) from e
        
        return str(new_turn.turn_id)