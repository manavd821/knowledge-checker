from datetime import datetime

from pydantic import BaseModel, ConfigDict
from models import (
    AI_STRICTNESS,
    Difficulty,
    SessionType,
    TopicType,
    RoleLevel,
    Domain,
)

class SessionConfig(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
        from_attributes=True,
    )

    # User
    user_id: str

    # Session setup
    session_type: SessionType
    topic_type: TopicType
    role_level: RoleLevel

    # Interview configuration
    difficulty: Difficulty
    domain: Domain
    custom_domain: str | None = None

    duration_minutes: int
    ai_strictness: AI_STRICTNESS

    # Features
    realtime_transcript: bool = False
    ai_hints_enabled: bool = False
    camera_required: bool = False

    # Customization
    custom_instructions: str | None = None
    session_brief: str

class SessionMeta(SessionConfig):
    model_config = ConfigDict(
        use_enum_values=True,
        from_attributes=True,
    )
    # Runtime metadata
    started_at: datetime | None = None

    # Runtime-only fields        
    worker_id : str | None = None # LiveKit job.id of the CURRENTLY attached worker
    room_sid : str | None = None # LiveKit's internal room sid, only if you have a concrete use for it
    
class TurnState(BaseModel):
    
    model_config = ConfigDict(
        use_enum_values=True,
    )
    
    current_turn_number : int
    current_difficulty : Difficulty | None = None
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
    