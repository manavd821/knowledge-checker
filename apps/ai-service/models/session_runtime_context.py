from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict
from models.enums import Difficulty

class SessionRuntimeContext(BaseModel):
    
    turn_number: int
    questions_asked: int
    fundamental_phase: bool

    current_difficulty: Difficulty
    current_question: str | None

    previous_score: float | None
    overall_score: float | None

    active_context: str
    context_tokens: int

    version: int

class SelectSessionRuntimeContext(SessionRuntimeContext):
    model_config = ConfigDict(from_attributes=True)

    session_runtime_context_id: str
    # session_id: UUID
    created_at: datetime
    updated_at: datetime
    
class InsertSessionRuntimeContext(SessionRuntimeContext):
    session_id: UUID