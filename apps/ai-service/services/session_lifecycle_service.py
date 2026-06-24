from datetime import datetime, timezone
from graph.dependencies import (
    get_cache_repo,
    get_session_repo,
    node_db_session,
)
from infrastructure import get_logger
from models import (
    STATUS,
    SessionMeta,
)
from typing import Coroutine, Any

logger = get_logger(__name__)

async def mark_session_started_if_needed(
    session_id : str,
    worker_id : str = "",
    room_sid_coroutine : Coroutine[str, Any, Any] | None = None,
):
    pass