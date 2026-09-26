from typing import TypeVar

from pydantic import BaseModel
from langchain_core.runnables import Runnable

from llm.provider_registry import get_provider_registry
from llm.resolver import LLMResolver
from llm.models import LLMModelProvider 
from llm.enums import Tasks
from execution_profile.enums import ExecutionProfile

SchemaT = TypeVar("SchemaT", bound=BaseModel)


class LLMGateway:

    def __init__(
        self,
        resolver: LLMResolver,
        profile: ExecutionProfile,
    ):
        self._resolver = resolver
        self._provider_registry = get_provider_registry()
        self._profile = profile

    def get_model(
        self,
        task: Tasks,
    ) -> Runnable:
        config = self._resolver.resolve(
            task,
            self._profile,
        )

        provider = self._provider_registry[
            config.llm_provider
        ]

        return provider.get_model(config)

    def get_structure_model(
        self,
        task: Tasks,
        schema: type[SchemaT],
    ) -> Runnable:
        config = self._resolver.resolve(
            task,
            self._profile,
        )

        provider = self._provider_registry[
            config.llm_provider
        ]

        return provider.get_structure_model(
            config,
            schema,
        )