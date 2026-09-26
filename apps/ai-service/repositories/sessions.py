from uuid import UUID

from sqlalchemy import select

from db.db_session import node_db_session
from models.sessions import SelectSession
from models.orm.sessions import Session


class SessionRepository:
    
    async def get_session_by_id(
        self,
        session_id: str,
    ) -> SelectSession | None:

        async with node_db_session() as session:
            result = await session.execute(
                select(Session).where(
                    Session.session_id == session_id
                )
            )

            db_session = result.scalar_one_or_none()

            if db_session is None:
                return None

            return SelectSession.model_validate(db_session)