
from datetime import UTC, datetime
from typing import Literal

from models import (
    InterviewGraphState,
)

def route_initial_turn(state : InterviewGraphState) -> Literal["greet","transcript_analyzer"]:
    if state.turn_number == 0:
        return "greet"
    return "transcript_analyzer"

def route_context_summerization(
    state : InterviewGraphState
) -> Literal["context_summarizer", "evaluator"]:
    if state.needs_summarization:
        return "context_summarizer"
    return "evaluator"

def route_response_generation(
    state : InterviewGraphState
) -> Literal["hint_generator","question_generator"]:
    if (
        state.ai_hints_enabled 
        and state.evaluation_score is not None 
        and state.evaluation_score < 5
    ):
        return "hint_generator"
    return "question_generator"

def route_session_lifecycle(state : InterviewGraphState) -> Literal["session_terminator", "interrupt"]:
    now = datetime.now(tz=UTC)
    if state.started_at is None or state.duration_minutes is None:
        raise ValueError(f"started_at can not be None: {state.session_id}")
    time_elapsed_seconds = (now - state.started_at).total_seconds()
    
    if (
        time_elapsed_seconds >= state.duration_minutes * 60
        or state.is_session_complete
    ):
        return "session_terminator"
    
    return "interrupt"
    