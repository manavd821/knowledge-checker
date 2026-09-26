from execution_profile.enums import ExecutionProfile
from speech_llm.enums import SpeechTasks 
from speech_llm.models import STTConfig, TTSConfig

class SpeechResolver:

    def __init__(self):
        self._stt_registry: dict[
            tuple[SpeechTasks, ExecutionProfile],
            STTConfig,
        ] = {}

        self._tts_registry: dict[
            tuple[SpeechTasks, ExecutionProfile],
            TTSConfig,
        ] = {}

    def resolve_stt(
        self,
        task: SpeechTasks,
        profile: ExecutionProfile,
    ) -> STTConfig:
        config = self._stt_registry.get((task, profile))

        if config is None:
            raise ValueError(
                f"No STT configuration registered for "
                f"task={task}, profile={profile}"
            )

        return config

    def resolve_tts(
        self,
        task: SpeechTasks,
        profile: ExecutionProfile,
    ) -> TTSConfig:
        config = self._tts_registry.get((task, profile))

        if config is None:
            raise ValueError(
                f"No TTS configuration registered for "
                f"task={task}, profile={profile}"
            )

        return config

    def register_stt(
        self,
        task: SpeechTasks,
        profile: ExecutionProfile,
        config: STTConfig,
    ) -> None:
        self._stt_registry[(task, profile)] = config

    def register_tts(
        self,
        task: SpeechTasks,
        profile: ExecutionProfile,
        config: TTSConfig,
    ) -> None:
        self._tts_registry[(task, profile)] = config     
