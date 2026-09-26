from abc import ABC, abstractmethod

from execution_profile.enums import ExecutionProfile
from langgraph.graph.state import CompiledStateGraph

from models.graph_state import InterviewGraphState

class IGraphFactory(ABC):
    
    @abstractmethod
    def create(
        self,
        profile: ExecutionProfile,
    ) -> CompiledStateGraph[InterviewGraphState]:
        raise NotImplementedError