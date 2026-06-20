import datetime
from fastapi_app.bootstrap.app_factory import create_app
from core.singletons import get_redis_client
from models.enums import AI_STRICTNESS, Difficulty
from models import (
    SessionMeta,
    TurnState,
    ContextCache,
)
from models.sessions import TurnStateUpdate
from repositories.cache_repository import CacheRepository

app = create_app()

@app.get('/')
async def home():
    return "hello"

@app.post('/test1')
async def test_redis(data : SessionMeta):
    redis = get_redis_client()
    
    cache_repo = CacheRepository(redis=redis)
    session_id = "manav123"
    await cache_repo.set_session_meta(
        session_id,
        data,
        5 * 60,
    )
    res = await cache_repo.get_session_meta(
        session_id
    )
    if not res :
        return "No data"
    return res.model_dump()
    
@app.post("/test2")
async def test_turn_state( data : TurnState):
    redis = get_redis_client()

    cache_repo = CacheRepository(redis=redis)
    session_id = "manav123"

    await cache_repo.set_turn_state(
        session_id=session_id,
        data=data,
        ttl_seconds=5 * 60,
    )

    res = await cache_repo.get_turn_state(
        session_id=session_id,
    )

    if not res:
        return "No data"

    return res.model_dump()

@app.post("/test3")
async def test_context_cache(data : ContextCache):
    redis = get_redis_client()

    cache_repo = CacheRepository(redis=redis)
    session_id = "manav123"

    await cache_repo.set_context_cache(
        session_id=session_id,
        data=data,
        ttl_seconds=5 * 60,
    )

    res = await cache_repo.get_context_cache(
        session_id=session_id,
    )

    if not res:
        return "No data"

    return res.model_dump()

@app.post("/test4")
async def test_turn_state2(data : TurnStateUpdate):
    redis = get_redis_client()

    cache_repo = CacheRepository(redis=redis)
    session_id = "manav123"

    await cache_repo.update_turn_state(
        session_id=session_id,
        update=data,
    )

    res = await cache_repo.get_turn_state(
        session_id=session_id,
    )

    if not res:
        return "No data"

    return res.model_dump()
