from enum import Enum
from multiprocessing.pool import RUN


class LiveSessionEvent(str, Enum):
    CANDIDATE_TURN_COMPLETED = "candidate_turn_completed"
    INTERVIEWER_TURN_COMPLETED = "interviewer_turn_completed"
    CANDIDATE_TURN_UPDATE = "candidate_turn_update"
    INTERVIEWER_RESPONSE_READY = "interviewer_response_ready"
    RUNTIME_CONTEXT_UPDATED = "runtime_context_updated"
    
    SESSION_PAUSED = "session_paused"
    SESSION_CONTEXT_UPDATED = "session_context_updated"
    
class HandlerPolicy(str, Enum):
    CRITICAL = "critical"
    BEST_EFFORT = "best_effort"