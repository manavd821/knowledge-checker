from cache.processor_session_context import ProcessorSessionContextCache
from cache.session import SessionCache
from cache.session_runtime_context import SessionRuntimeContextCache
from lib.redis.factory import get_cache_redis_cloud
from repositories.session_runtime_context import SessionRuntimeContextRepository
from repositories.sessions import SessionRepository
from services.session_context_store import SessionContextStore
from services.session_runtime_context import SessionRuntimeContextService
from services.session_service import SessionService

def get_session_service() -> SessionService:
    redis = get_cache_redis_cloud()
    session_repo = SessionRepository()
    session_cache = SessionCache(redis)
    return SessionService(
        session_repo=session_repo,
        session_cache=session_cache
    )

def get_session_runtime_ctx_service() -> SessionRuntimeContextService:
    redis = get_cache_redis_cloud()
    session_runtime_ctx_repo = SessionRuntimeContextRepository()
    session_runtime_ctx_cache = SessionRuntimeContextCache(redis)
    
    return SessionRuntimeContextService(
        session_runtime_ctx_repo = session_runtime_ctx_repo,
        session_runtime_ctx_cache=session_runtime_ctx_cache,
    )
    
def get_session_context_store() -> SessionContextStore:
    redis = get_cache_redis_cloud()
    return SessionContextStore(
        ProcessorSessionContextCache(redis),
        session_service=get_session_service(),
        session_runtime_ctx_service=get_session_runtime_ctx_service()
    )