from speech_llm.models import STTConfig
from speech_llm.stt.provider.stt_provider import ISTTProvider
from livekit.plugins import elevenlabs

class ElevenLabsProvider(ISTTProvider):

    def create(self, config: STTConfig):
        return elevenlabs.STT(
            model_id=config.stt_model.value,
            language_code=config.language
        )