from speech_llm.models import TTSConfig
from livekit.plugins import cartesia

from speech_llm.tts.provider.tts_provider import ITTSProvider

class CartesiaProvider(ITTSProvider):

    def create(self, config: TTSConfig):
        return cartesia.TTS(
            model=config.tts_model.value,
            language=config.language,
        )