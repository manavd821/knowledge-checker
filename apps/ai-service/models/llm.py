from enum import Enum

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
    
MODEL_PROVIDER_MAP : dict[LLMModel, LLMModelProvider]  = {
    LLMModel.GPT_4O: LLMModelProvider.OPENAI,
    LLMModel.GPT_4O_MINI: LLMModelProvider.OPENAI,

    LLMModel.GEMINI_2_5_PRO: LLMModelProvider.GOOGLE_GENAI,
    LLMModel.GEMINI_2_5_FLASH: LLMModelProvider.GOOGLE_GENAI,
    LLMModel.GEMINI_3_1_FLASH_LITE : LLMModelProvider.GOOGLE_GENAI,
    LLMModel.GEMINI_3_5_FLASH: LLMModelProvider.GOOGLE_GENAI,

    LLMModel.CLAUDE_SONNET_4: LLMModelProvider.ANTHROPIC,
}

class LLMTask(str, Enum):
    TURN_EVALUATION = "turn_evaluation"
    SESSION_EVALUATION = "session_evaluation"
    QUESTION_GEN      = "question_gen"
    HINT_GEN          = "hint_gen"
    CONTEXT_SUMMARY   = "context_summary"

# model, temperature, task
TASK_CONFIG : dict[LLMTask, tuple[LLMModel, float, int]] = {
    LLMTask.SESSION_EVALUATION : (LLMModel.GEMINI_3_5_FLASH, 0.0, 2048),
    LLMTask.TURN_EVALUATION : (LLMModel.GEMINI_3_1_FLASH_LITE, 0.0, 1024),
    LLMTask.QUESTION_GEN : (LLMModel.GEMINI_3_1_FLASH_LITE, 0.5, 512),
    LLMTask.HINT_GEN : (LLMModel.GEMINI_3_1_FLASH_LITE, 0.2, 512),
    LLMTask.CONTEXT_SUMMARY : (LLMModel.GEMINI_2_5_PRO, 0.3, 2048),
}