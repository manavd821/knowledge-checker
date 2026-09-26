from abc import ABC, abstractmethod
from typing import TypeVar

from langchain.chat_models import BaseChatModel
from pydantic import BaseModel

from llm.enums import LLMModel
from llm.models import TaskConfig
from langchain_core.runnables import Runnable


SchemaT = TypeVar("SchemaT", bound=BaseModel)


class ILLMProvider(ABC):
    @abstractmethod
    def get_base_model(self, model: LLMModel) -> BaseChatModel:
        """
        Return the underlying LLM model instance.
        """
        pass

    @abstractmethod
    def get_model(self, config: TaskConfig) -> Runnable:
        """
        Return a configured model according to the task configuration.
        """
        pass

    @abstractmethod
    def get_structure_model(
        self,
        config: TaskConfig,
        schema: type[SchemaT],
    ) -> Runnable:
        """
        Return a model configured for structured output.
        """
        pass