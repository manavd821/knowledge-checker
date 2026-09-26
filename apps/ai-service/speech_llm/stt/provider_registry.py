from speech_llm.enums import STTModelProvider
from speech_llm.stt.provider.stt_provider import ISTTProvider

from speech_llm.stt.provider.deepgram import DeepgramProvider
from speech_llm.stt.provider.assemblyai import AssemblyAIProvider
from speech_llm.stt.provider.elevenlabs import ElevenLabsProvider
from speech_llm.stt.provider.cartesia import CartesiaProvider


class STTProviderRegistry:

    def __init__(self):
        self._providers: dict[
            STTModelProvider,
            ISTTProvider,
        ] = {
            STTModelProvider.DEEPGRAM: DeepgramProvider(),
            STTModelProvider.ASSEMBLY_AI: AssemblyAIProvider(),
            STTModelProvider.ELEVEN_LABS: ElevenLabsProvider(),
            STTModelProvider.CARTESIA: CartesiaProvider(),
        }

    def get(
        self,
        provider: STTModelProvider,
    ) -> ISTTProvider:

        return self._providers[provider]