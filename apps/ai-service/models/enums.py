from enum import Enum

class STATUS(str, Enum):
    PENDING = "pending"
    ACTIVE = "active"
    COMPLETED = "completed"
    ABANDONED = "abandoned"

class SessionType(str, Enum):
    AI_SESSION = "ai_session"
    HUMAN_SESSION = "human_session"

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
    
class AI_STRICTNESS(str, Enum):
    LENIENT = "lenient"
    BALANCED = "balanced"
    STRICT = "strict"
    ULTRA_STRICT ="ultra_strict"

class Domain(str, Enum):
    SWE = "swe"
    DATA_SCIENCE = "data_science"
    DEVOPS = "devops"
    PRODUCT = "product"
    CUSTOM = "custom"

class FileType(str, Enum):
    PDF = "pdf"
    DOCX = "docx"
    TXT = "txt"
    MD = "md"
    
class Speaker(str, Enum):
    USER = "user"
    AI = "ai"

class ContentType(str, Enum):
    QUESTION = "question"
    HINT = "hint"
    FEEDBACK = "feedback"
    SUMMARY = "summary"
    GREETING = "greeting"
    ANSWER = "answer"
    