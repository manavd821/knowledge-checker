from speech_llm.resolver import SpeechResolver
from speech_llm.stt.provider_registry import STTProviderRegistry
from speech_llm.enums import SpeechTasks
from execution_profile.enums import ExecutionProfile


class STTFactory:

    def __init__(
        self,
        resolver: SpeechResolver,
        registry: STTProviderRegistry,
    ):
        self._resolver = resolver
        self._registry = registry

    def create(
        self,
        task: SpeechTasks,
        profile: ExecutionProfile,
    ):

        config = self._resolver.resolve_stt(
            task,
            profile,
        )

        provider = self._registry.get(
            config.stt_model_provider,
        )

        return provider.create(config)