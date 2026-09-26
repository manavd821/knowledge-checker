from abc import ABC, abstractmethod

from speech_llm.models import TTSConfig


class ITTSProvider(ABC):

    @abstractmethod
    def create(self, config: TTSConfig):
        raise NotImplementedError