from enum import Enum

class SpeechTasks(str, Enum):
    LIVE_STT = "live_stt"
    POSTPROCESS_STT = "postprocess_stt"
    LIVE_TTS = "live_tts"
    
class STTModelProvider(str, Enum):
    DEEPGRAM = "deepgram"
    ASSEMBLY_AI = "assembly_ai"
    ELEVEN_LABS = "eleven_labs"
    OPENAI = "openai"
    CARTESIA = "cartesia"
    
class STTModel(str, Enum):
    # Deepgram
    DEEPGRAM_FLUX_GENERAL_EN = "flux-general-en"
    DEEPGRAM_FLUX_GENERAL_MULTI = "flux-general-multi"
    DEEPGRAM_NOVA_3 = "nova-3"

    # AssemblyAI
    ASSEMBLY_AI_UNIVERSAL_3_PRO = "universal-3-pro"
    ASSEMBLY_AI_UNIVERSAL_3_PRO_STREAMING = "u3-rt-pro"
    ASSEMBLY_AI_UNIVERSAL_2 = "universal-2"
    ASSEMBLY_AI_UNIVERSAL_STREAMING = "universal-streaming"

    # ElevenLabs
    ELEVENLABS_SCRIBE_V2 = "scribe_v2"
    ELEVENLABS_SCRIBE_V2_REALTIME = "scribe_v2_realtime"

    # OpenAI
    OPENAI_GPT_4O_TRANSCRIBE = "gpt-4o-transcribe"
    OPENAI_GPT_4O_MINI_TRANSCRIBE = "gpt-4o-mini-transcribe"
    OPENAI_WHISPER_1 = "whisper-1"

    # Cartesia
    CARTESIA_INK_WHISPER = "ink-whisper"
       
class TTSModelProvider(str, Enum):
    CARTESIA = "cartesia"
    ELEVEN_LABS = "eleven_labs"
    OPENAI = "openai"

class TTSModel(str, Enum):
    # Cartesia
    CARTESIA_SONIC_3_5 = "sonic-3.5"
    CARTESIA_SONIC_3 = "sonic-3"

    # ElevenLabs
    ELEVENLABS_V3 = "eleven_v3"
    ELEVENLABS_MULTILINGUAL_V2 = "eleven_multilingual_v2"
    ELEVENLABS_FLASH_V2_5 = "eleven_flash_v2_5"

    # OpenAI
    OPENAI_GPT_4O_MINI_TTS = "gpt-4o-mini-tts"
    OPENAI_TTS_1 = "tts-1"
    OPENAI_TTS_1_HD = "tts-1-hd"