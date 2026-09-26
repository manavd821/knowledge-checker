from abc import ABC, abstractmethod

from execution_profile.enums import ExecutionProfile
from models.sessions import SessionContext

class IProfileProvider(ABC):

    @abstractmethod
    def select(
        self,
        context: SessionContext,
    ) -> ExecutionProfile:
        raise NotImplementedError