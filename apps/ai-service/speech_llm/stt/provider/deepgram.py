from speech_llm.models import STTConfig
from speech_llm.stt.provider.stt_provider import ISTTProvider
from livekit.plugins import deepgram

class DeepgramProvider(ISTTProvider):

    def create(self, config: STTConfig):
        return deepgram.STT(
            model=config.stt_model.value,
            language=config.language,
        )