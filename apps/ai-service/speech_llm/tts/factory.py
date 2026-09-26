from speech_llm.resolver import SpeechResolver
from speech_llm.tts.provider_registry import TTSProviderRegistry
from speech_llm.enums import SpeechTasks
from execution_profile.enums import ExecutionProfile


class TTSFactory:

    def __init__(
        self,
        resolver: SpeechResolver,
        registry: TTSProviderRegistry,
    ):
        self._resolver = resolver
        self._registry = registry

    def create(
        self,
        task: SpeechTasks,
        profile: ExecutionProfile,
    ):

        config = self._resolver.resolve_tts(
            task,
            profile,
        )

        provider = self._registry.get(
            config.tts_model_provider,
        )

        return provider.create(config)