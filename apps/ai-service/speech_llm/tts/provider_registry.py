from speech_llm.enums import TTSModelProvider
from speech_llm.tts.provider.tts_provider import ITTSProvider

from speech_llm.tts.provider.elevenlabs import ElevenLabsProvider
from speech_llm.tts.provider.cartesia import CartesiaProvider


class TTSProviderRegistry:

    def __init__(self):
        self._providers: dict[
            TTSModelProvider,
            ITTSProvider,
        ] = {
            TTSModelProvider.ELEVEN_LABS: ElevenLabsProvider(),
            TTSModelProvider.CARTESIA: CartesiaProvider(),
        }

    def get(
        self,
        provider: TTSModelProvider,
    ) -> ITTSProvider:

        return self._providers[provider]