from enum import Enum
from multiprocessing.pool import RUN


class LiveSessionEvent(str, Enum):
    CANDIDATE_TURN_COMPLETED = "candidate_turn_completed"
    INTERVIEWER_TURN_COMPLETED = "interviewer_turn_completed"
    CANDIDATE_TURN_UPDATE = "candidate_turn_update"
    SESSION_PAUSED = "session_paused"
    RUNTIME_CONTEXT_UPDATED = "runtime_context_updated"
    INTERVIEWER_RESPONSE_READY = "interviewer_response_ready"
    
    
class HandlerPolicy(str, Enum):
    CRITICAL = "critical"
    BEST_EFFORT = "best_effort"