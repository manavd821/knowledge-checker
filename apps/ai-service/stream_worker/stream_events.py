from enum import Enum

class StreamEvent(str, Enum):
    
    CREATE_TURN_EVENT = "create_turn_event"
    UPDATE_CANDIDATE_TURN_EVENT = "update_candidate_turn_event"
    
    RUNTIME_CONTEXT_UPDATED = "runtime_context_updated"
    # SESSION_PAUSED = "session_paused"
