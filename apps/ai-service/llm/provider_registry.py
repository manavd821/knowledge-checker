from functools import lru_cache

from llm.enums import LLMModelProvider
from llm.llm_provider.google_genai import GoogleGenAIProvider
from llm.llm_provider.llm_provider import ILLMProvider
from llm.llm_provider.openai import OpenAIProvider

@lru_cache
def get_provider_registry() -> dict[LLMModelProvider, ILLMProvider]:
    return {
        LLMModelProvider.GOOGLE_GENAI : GoogleGenAIProvider(),
        LLMModelProvider.OPENAI : OpenAIProvider()
    }