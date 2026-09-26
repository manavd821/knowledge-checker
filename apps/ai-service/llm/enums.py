from enum import Enum
from pydantic import BaseModel

class LLMModelProvider(str, Enum):
    GOOGLE_GENAI = "google_genai"
    OPENAI = "openai"
    ANTHROPIC = "anthropic"
    GROQ = "groq"


class LLMModel(str, Enum):
    GEMINI_3_5_FLASH = "gemini-3.5-flash"
    GEMINI_3_1_FLASH_LITE = "gemini-3.1-flash-lite"
    GEMINI_2_5_PRO = "gemini-2.5-pro"
    GEMINI_2_5_FLASH = "gemini-2.5-flash"
    GPT_4O = "gpt-4o"
    GPT_4O_MINI = "gpt-4o-mini"
    CLAUDE_SONNET_4 = "claude-sonnet-4"


class Tasks(str, Enum):
    TURN_EVALUATION = "turn_evaluation"
    SESSION_EVALUATION = "session_evaluation"
    QUESTION_GEN = "question-gen"
    HINT_GEN = "hint-gen"
    CONTEXT_SUMMARY = "context_summary"

