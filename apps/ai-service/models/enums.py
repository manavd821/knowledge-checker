from enum import Enum

class STATUS(str, Enum):
    PREPARING = "preparing"
    READY = "ready"
    ACTIVE = "active"
    PAUSE = "pause"
    COMPLETED = "completed"
    FAILED = "failed"


class SessionType(str, Enum):
    AI_SESSION = "ai_session"
    HUMAN_SESSION = "human_session"


class ROLE(str, Enum):
    CANDIDATE = "candidate"
    INTERVIEWER = "interviewer"
    OBSERVER = "observer"


class TopicType(str, Enum):
    MOCK_INTERVIEW = "mock_interview"
    TECHNICAL = "technical"
    BEHAVIORAL = "behavioral"
    DEBATE = "debate"
    CUSTOM = "custom"


class RoleLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    EXPERIENCED = "experienced"
    SENIOR = "senior"


class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    EXPERT = "expert"


class Domain(str, Enum):
    SWE = "swe"
    DATA_SCIENCE = "data_science"
    DEVOPS = "devops"
    PRODUCT = "product"
    CUSTOM = "custom"


class AI_STRICTNESS(str, Enum):
    LENIENT = "lenient"
    BALANCED = "balanced"
    STRICT = "strict"
    ULTRA_STRICT = "ultra_strict"


class FileType(str, Enum):
    PDF = "pdf"
    DOCX = "docx"
    TXT = "txt"
    MD = "md"


class Speaker(str, Enum):
    CANDIDATE = "candidate"
    INTERVIEWER = "interviewer"

class ContentType(str, Enum):
    QUESTION = "question"
    HINT = "hint"
    FEEDBACK = "feedback"
    SUMMARY = "summary"
    GREETING = "greeting"
    ANSWER = "answer"


class DisconnectReason(str, Enum):
    MANUAL_LEAVE = "manual_leave"
    NETWORK_DISCONNECT = "network_disconnect"
    CONNECTION_LOST = "connection_lost"
    SESSION_COMPLETED = "session_completed"
    REMOVED = "removed"


SESSION_DURATIONS = (
    15,
    20,
    30,
    45,
    60,
    90,
    120,
)