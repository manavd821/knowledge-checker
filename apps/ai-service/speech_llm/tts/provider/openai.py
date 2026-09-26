from speech_llm.models import TTSConfig
from speech_llm.tts.provider.tts_provider import ITTSProvider
from livekit.plugins import openai

class OpenAIProvider(ITTSProvider):

    def create(self, config: TTSConfig):
        return openai.TTS(
            model=config.tts_model.value,
        )