from speech_llm.models import TTSConfig
from speech_llm.tts.provider.tts_provider import ITTSProvider
from livekit.plugins import elevenlabs

class ElevenLabsProvider(ITTSProvider):

    def create(self, config: TTSConfig):
        return elevenlabs.TTS(
            model=config.tts_model.value,
            language=config.language
        )