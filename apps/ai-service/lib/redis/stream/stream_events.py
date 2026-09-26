from enum import Enum

class StreamEvent(str, Enum):
    CANDIDATE_TURN_COMPLETED = "candidate_turn_completed"
    INTERVIEWER_TURN_COMPLETED = "interviewer_turn_completed"
    
    CANDIDATE_TURN_UPDATE = "candidate_turn_update"
    RUNTIME_CONTEXT_UPDATED = "runtime_context_updated"
    # SESSION_PAUSED = "session_paused"
