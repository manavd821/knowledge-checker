from infrastructure import (
    get_logger,
    RedisClient,
)
from models import (
    SessionMeta,
    TurnState,
    SessionMeta,
    TurnStateUpdate,
)
from exceptions.domain import (
    TurnStateNotFound,
)
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
            raise TurnStateNotFound(session_id)
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
    
    async def delete_session_keys(self, session_id: str) -> None:
        key_prefix = f"session:{session_id}"
        await self._redis.delete(
            f"{key_prefix}:turn_state",
            f"{key_prefix}:meta",
        )