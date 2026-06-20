from sqlalchemy import exists

from core.singletons import get_redis_client
from exceptions.client import ClientError
from infrastructure import (
    get_logger,
    RedisClient
)
from models import (
    SessionMeta,
    TurnState,
    ContextCache,
)
from models.sessions import TurnStateUpdate

logger = get_logger(__name__)

class CacheRepository:
    def __init__(self, redis : RedisClient) -> None:
        self._redis = redis.client
        logger.debug("CacheRepository created")
    
    async def set_session_meta(
        self, 
        session_id : str,
        data : SessionMeta,
        ttl_seconds : int
    ) -> None:
        key = f"session:{session_id}:meta"
        
        await self._redis.set(
            key,
            data.model_dump_json(),
            ex=ttl_seconds
        )
        
    async def get_session_meta(self, session_id : str) -> SessionMeta | None:
        data = await self._redis.get(f"session:{session_id}:meta")
        if not data:
            return None
        
        return SessionMeta.model_validate_json(data)
    
    async def set_turn_state(
        self, 
        session_id : str,
        data : TurnState,
        ttl_seconds : int,
    ) -> None :
        key = f"session:{session_id}:turn_state"
        
        await self._redis.hsetex(
            key=key,
            values = data.model_dump(),
            ex=ttl_seconds,
        )
    
    async def update_turn_state(
        self,
        session_id : str,
        update : TurnStateUpdate,
    ) -> None:
        
        key = f"session:{session_id}:turn_state"
        
        exists = await self._redis.exists(key)
        if not exists:
            raise ClientError("Turn state does not exists")
        data = update.model_dump(
                exclude_unset=True,
                mode="json",
            )
        if not data:
            return
        
        await self._redis.hset(
            key,
            values=data,
        )
    
    async def get_turn_state(self, session_id : str) -> TurnState | None:
        data = await self._redis.hgetall(f"session:{session_id}:turn_state")
        if not data:
            return None
        
        return TurnState.model_validate(data)
    
    async def set_context_cache(
        self,
        session_id : str,
        data : ContextCache,
        ttl_seconds : int,
    ) -> None:
        key = f"session:{session_id}:context_cache"
        
        await self._redis.set(
            key = key,
            value=data.model_dump_json(),
            ex = ttl_seconds
        )
    
    async def get_context_cache(self, session_id : str) -> ContextCache | None:
        data = await self._redis.get(f"session:{session_id}:context_cache")
        if not data:
            return None
        return  ContextCache.model_validate_json(data)