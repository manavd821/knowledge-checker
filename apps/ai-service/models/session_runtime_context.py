from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict
from models.enums import Difficulty

class SessionRuntimeContextBase(BaseModel):
    
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

class SelectSessionRuntimeContext(SessionRuntimeContextBase):
    model_config = ConfigDict(from_attributes=True)

    session_runtime_context_id: UUID
    session_id: UUID
    created_at: datetime
    updated_at: datetime
    
class InsertSessionRuntimeContext(SessionRuntimeContextBase):
    session_id: UUID