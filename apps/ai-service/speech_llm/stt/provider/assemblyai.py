from speech_llm.models import STTConfig
from speech_llm.stt.provider.stt_provider import ISTTProvider
from livekit.plugins import assemblyai

class AssemblyAIProvider(ISTTProvider):

    def create(self, config: STTConfig):
        return assemblyai.STT(
            model=config.stt_model.value, # type: ignore
        )