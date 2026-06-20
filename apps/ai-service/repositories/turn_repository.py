from sqlalchemy.ext.asyncio import AsyncSession
from infrastructure import get_logger
from models.orm import Turn
from exceptions.client_database import DatabaseError

logger = get_logger(__name__)

class TurnRepository:
    def __init__(self, session : AsyncSession) -> None:
        self._session = session
        logger.debug("TurnRepository created")
        
    async def create_turn(
        self,
        session_id : str,
        turn_number : int, 
        speaker : str,
        **kwargs
    ) -> str | None:
        new_turn = Turn(
            session_id = session_id,
            turn_number=turn_number,
            speaker=speaker,
            **kwargs,
        )
        self._session.add(new_turn)
        try:
            await self._session.flush()
        except Exception as e:
            raise DatabaseError(
                operation="create_turn", 
                reason=str(e)
            ) from e
        
        return str(new_turn.turn_id)