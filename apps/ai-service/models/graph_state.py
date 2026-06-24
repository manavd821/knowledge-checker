from datetime import datetime

from pydantic import BaseModel
from models import (
    Difficulty,
    ContentType,
    AI_STRICTNESS,
    TopicType,
    Domain,
)

    
class InterviewGraphState(BaseModel):
#  -- Identity (never changes across turns)
    session_id : str
    user_id : str | None = None
    thread_id : str | None = None # = session_id
    
    
#     -- Session config (loaded once, never changes)
    session_brief : str | None = None
    defined_difficulty : Difficulty | None = None
    ai_strictness : AI_STRICTNESS | None = None
    ai_hints_enabled : bool = False
    topic_type : TopicType | None = None
    domain : Domain | None = None
    custom_instructions : str | None = None
    duration_minutes: int | None = None
    
#   Session timing (NEW)
    started_at : datetime | None = None
    
#     -- Turn tracking (updates every turn)
    turn_number: int = 0
    fundamental_phase: bool = True
    questions_asked: int = 0

#     -- Difficulty state (difficulty rules 1-3)
    current_difficulty : Difficulty | None = None
    overall_score : float | None = None
    previous_score : float | None = None
    
#     -- Current turn inputs (fresh each turn)
    user_transcript : str | None = None
    transcript_tokens : int = 0
    user_audio_duration_sec: float | None = None
    current_question : str | None = None

#     -- Context memory (managed by summarization logic)
    active_context : str = ""
    context_tokens : int = 0
    
#    -- greet state (managed by greet logic)
    ai_greet : str | None = None

#    -- hint state (managed by hint logic)
    ai_hint : str | None = None
    
#     -- Current turn outputs (set by nodes)
    evaluation_score : float | None = None
    evaluation_feedback : str | None = None
    evaluation_rubric : dict | None = None
    next_question : str | None = None
    next_question_tokens : int | None = None
    content_type : ContentType | None = None
    final_response : str | None = None
    
#     -- Routing flags (set by nodes, read by edges)
    needs_summarization : bool = False
#   Session lifecycle    
    is_session_complete : bool = False
    user_requested_end : bool = False
