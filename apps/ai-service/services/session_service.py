from cache.session import SessionCache
from config.settings import get_settings
from exceptions.NotFoundError import NotFoundError
from models.sessions import SelectSession, SessionContext
from repositories.sessions import SessionRepository


class SessionService:
    def __init__(
        self,
        session_repo: SessionRepository,
        session_cache: SessionCache,
    ) :
        self._session_repo = session_repo
        self._session_cache = session_cache
        
    async def get_session(
        self,
        session_id: str,
    ) -> SelectSession:
        # cache
        data = await self._session_cache.get_session(session_id)
        if data:
            return data
        # cache miss
        # get from db
        session = await self._session_repo.get_session_by_id(session_id)
        if not session:
            raise NotFoundError(
                f"session not found:{session_id}",
                "session",
                session_id
            )
        # set in cache
        tts_seconds = get_settings().GRAPH_REDIS_TTS_MINUTES * 60
        await self._session_cache.set_session(session_id, session, tts_seconds)
        
        return SelectSession.model_validate(session)
        