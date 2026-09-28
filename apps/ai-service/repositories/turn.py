from uuid import UUID

from sqlalchemy import select, update

from db.db_session import node_db_session
from models.orm.sessions import Session
from models.orm.turns import Turn
from models.turns import CreateTurn, SelectTurn


class TurnRepository:        
        
    async def create_turn(
        self,
        session_id: UUID,
        turn: CreateTurn,
    ) -> SelectTurn:

        evaluation = turn.turn_evaluation

        async with node_db_session() as session:
            # Serialize turn creation for this session
            await session.execute(
                select(Session)
                .where(Session.session_id == session_id)
                .with_for_update()
            )
            latest_turn = await session.scalar(
                select(Turn)
                .where(Turn.session_id == session_id)
                .order_by(Turn.turn_number.desc())
                .limit(1)
            )
            latest_turn_number = (
                latest_turn.turn_number + 1
                if latest_turn is not None
                else 1
            )
            db_turn = Turn(
                turn_id=turn.turn_id,
                session_id=turn.session_id,
                turn_number=latest_turn_number,
                speaker=turn.speaker,
                content=turn.content,
                content_type=turn.content_type,
    
                user_audio_duration_sec=(
                    turn.user_audio_duration_sec
                ),
    
                evaluation_score=(
                    evaluation.evaluation_score
                    if evaluation is not None
                    else None
                ),
    
                evaluation_feedback=(
                    evaluation.evaluation_feedback
                    if evaluation is not None
                    else None
                ),
    
                evaluation_rubric=(
                    evaluation.evaluation_rubric.model_dump(
                        mode="json"
                    )
                    if evaluation is not None
                    else None
                ),
    
                difficulty_applied=(
                    evaluation.difficulty_applied
                    if evaluation is not None
                    else None
                ),
    
                tokens_used=turn.tokens_used,
                latency_ms=turn.latency_ms,
            )
            
            session.add(db_turn)

            await session.flush()
            return SelectTurn.model_validate(db_turn)
        
    async def update_turn(
        self,
        turn_id: UUID,
        data: dict,
    ):
        stmt = (
            update(Turn)
            .where(Turn.turn_id == turn_id)
            .values(data)
        )
        async with node_db_session() as session:
            await session.execute(stmt)
        