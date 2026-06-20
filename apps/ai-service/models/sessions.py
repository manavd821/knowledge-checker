from datetime import datetime

from pydantic import BaseModel, ConfigDict
from models.enums import (
    AI_STRICTNESS,
    Difficulty,
)

class SessionMeta(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
    )
    
    user_id : str
    session_brief : str
    
    difficulty : Difficulty
    ai_strictness : AI_STRICTNESS
    ai_hints_enabled : bool = False
    
    livekit_room_id : str
    worker_id : str
    
    started_at : datetime

class TurnState(BaseModel):
    
    model_config = ConfigDict(
        use_enum_values=True,
    )
    
    current_turn_number : int
    current_difficulty : Difficulty
    overall_score_running : float | None = None
    previous_score : float | None = None
    fundamental_phase : bool
    questions_asked_count : int
    
class TurnStateUpdate(BaseModel):
    
    model_config = ConfigDict(
        use_enum_values=True,
    )
    
    current_turn_number : int | None = None
    current_difficulty : Difficulty | None = None
    overall_score_running : float | None = None
    previous_score : float | None = None
    fundamental_phase : bool | None = None
    questions_asked_count : int | None = None
    
class ContextCache(BaseModel):
    
    context_text : str
    token_count : int