from typing import TypeVar

from pydantic import BaseModel
from langchain_core.runnables import Runnable

from llm.enums import LLMModel, LLMModelProvider
from llm.llm_provider.llm_provider import ILLMProvider
from llm.models import TaskConfig
from langchain.chat_models import BaseChatModel, init_chat_model

SchemaT = TypeVar("SchemaT", bound=BaseModel)


class OpenAIProvider(ILLMProvider):
    def __init__(self):
        self._models : dict[LLMModel, BaseChatModel] = {}
    
    def get_base_model(self, model: LLMModel) -> BaseChatModel:
        cached_model = self._models.get(model)
        if cached_model is not None:
            return cached_model

        provider = LLMModelProvider.OPENAI.value

        llm_model = init_chat_model(
            f"{provider}:{model.value}",
        )

        self._models[model] = llm_model

        return llm_model


    def get_model(self, config: TaskConfig) -> Runnable:
        model = config.llm_model

        base_model = self.get_base_model(model)
        model_config = config.model_dump(
            exclude={"llm_provider", "llm_model"}
        )
        
        configured_model  = base_model.bind(**model_config)        
        return configured_model 

    def get_structure_model(
        self,
        config: TaskConfig,
        schema: type[SchemaT],
    ) -> Runnable:
        model = config.llm_model
        
        base_model = self.get_base_model(model)
        structured_model = base_model.with_structured_output(schema)
        
        model_config = config.model_dump(
            exclude={"llm_provider", "llm_model"}
        )
        configured_model = structured_model.bind(**model_config)
        
        return configured_model