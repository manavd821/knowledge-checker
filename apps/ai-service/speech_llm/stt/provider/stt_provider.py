from abc import ABC, abstractmethod

from speech_llm.models import STTConfig


class ISTTProvider(ABC):

    @abstractmethod
    def create(self, config: STTConfig):
        raise NotImplementedError