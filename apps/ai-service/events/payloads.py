from collections import deque
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from models.enums import ContentType, Difficulty

class CandidateTurnCompleted(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
    )

    session_id: UUID
    transcript: str
    turn_id: UUID
    participant_id: str
    speaker: str = "candidate"
    content_type: str = "answer"
    user_audio_duration_sec: float | None = None

class InterviewerTurnCompleted(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
    )
    
    session_id: UUID
    participant_id: str
    turn_id: UUID

    speaker: str = "interviewer"
    content: str | None = None
    content_type: ContentType = ContentType.QUESTION

    tokens_used: int | None = None

class CandidateTurnUpdated(BaseModel):
    session_id: UUID
    turn_id: UUID

    evaluation_score: float | None = None
    evaluation_feedback: str | None = None
    evaluation_rubric: dict | None = None
    
class RuntimeContextUpdated(BaseModel):
    session_id: UUID

    fundamental_phase: bool
    current_difficulty: Difficulty

    previous_score: float | None
    overall_score: float | None

    current_question: str | None
    questions_asked: int

    active_context: str | None
    context_tokens: int

    version: int

class InterviewerResponseReady(BaseModel):
    session_id: UUID
    response: str
    
class SessionPausedPayload(BaseModel):
    session_id: UUID
    reason: str

# ----- models ----
class SessionExecutionState(BaseModel):
    queue: deque[CandidateTurnCompleted] = Field(
        default_factory=deque
    )
    running: bool = False
    
class SessionRuntimeContextUpdate(BaseModel):
    fundamental_phase: bool
    current_difficulty: Difficulty

    previous_score: float | None
    overall_score: float | None

    current_question: str | None
    questions_asked: int

    version: int

class SessionContextUpdate(BaseModel):
    fundamental_phase: bool
    current_difficulty: Difficulty
    previous_score: float | None
    overall_score: float | None

    current_question: str | None
    questions_asked: int

    active_context: str | None
    context_tokens: int

    version: int
    
class MergeCandidateTurn(BaseModel):
    session_id: UUID
    participant_id: str
    
    turn_id: list[UUID]
    
    transcript: str
    transcript_tokens: int
    
    evaluation_turn_id: UUID