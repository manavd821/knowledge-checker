from pydantic import BaseModel
from models.enums import (
    ContentType,
)
from models.sessions import SessionContext

class InterviewGraphState(BaseModel):

    # Session runtime snapshot
    context: SessionContext

    # Current candidate turn
    user_transcript: str
    transcript_tokens: int

    # Current conversational input/state
    current_question: str | None = None

    # Current execution outputs
    evaluation_score: float | None = None
    evaluation_feedback: str | None = None
    evaluation_rubric: dict | None = None

    next_question: str | None = None
    content_type: ContentType | None = None

    final_response: str | None = None

    # Graph routing
    needs_summarization: bool | None = None