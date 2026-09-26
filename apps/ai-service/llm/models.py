from llm.enums import LLMModelProvider, LLMModel
from pydantic import BaseModel

class TaskConfig(BaseModel):
    temperature: float
    max_tokens: int

    llm_provider: LLMModelProvider
    llm_model: LLMModel