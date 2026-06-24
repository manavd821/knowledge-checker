from langchain.chat_models import (
    BaseChatModel, 
    init_chat_model,
)
from pydantic import BaseModel
from models import (
    LLMModel,
    MODEL_PROVIDER_MAP,
    TASK_CONFIG,
    LLMModelProvider,
)
from models.llm import LLMTask
from infrastructure import get_logger


logger = get_logger(__name__)

class LLMProvider:
    """Holds initialized LLM instances. Built once, reused everywhere."""
    def __init__(self) -> None:
        self._models : dict[LLMModel, BaseChatModel] = {}
        for model in set(model for model, _, _ in TASK_CONFIG.values()):
            provider = MODEL_PROVIDER_MAP[model]
            self._models[model] = init_chat_model(
                model=f"{provider.value}:{model.value}"
            )
        logger.debug("LLMProvider is created")
    
    def get_model_for_task(
        self, 
        task : LLMTask,
    ):
        """
        Returns a configured LLM instance for a specific task
        """
        model, temperature, max_tokens = TASK_CONFIG[task]
        base = self._models[model]
        provider = MODEL_PROVIDER_MAP[model]
        if provider == LLMModelProvider.GOOGLE_GENAI:
            return base.bind(
                temperature=temperature,
                max_output_tokens=max_tokens,
            )
        return base.bind(
            temperature = temperature,
            max_tokens = max_tokens,
        )
    
    def get_structured_model_for_task(
        self,
        task : LLMTask,
        schema : type[BaseModel]
    ):
        model, temperature, max_tokens = TASK_CONFIG[task]
        provider = MODEL_PROVIDER_MAP[model]
        base = self._models[model].with_structured_output(schema=schema)
        if provider == LLMModelProvider.GOOGLE_GENAI:
            return base.bind(
                temperature=temperature,
                max_output_tokens=max_tokens,
            )

        return base.bind(
                temperature = temperature,
                max_output_tokens = max_tokens,
            )
            
        
        
        