from execution_profile.factory import get_graph_provider
from graph.enums import GraphType
from graph.graph_registry import GraphRegistry
from graph.graph_runtime import GraphRuntime
from graph.graph_selector import GraphSelector

from graph.graph_factory.ai_interview import AIInterviewGraphFactory
from graph.graph_factory.human_interview import HumanInterviewGraphFactory

def get_graph_registry() -> GraphRegistry:
    registry = GraphRegistry()
    
    registry.register(
        GraphType.AI_INTERVIEW,
        AIInterviewGraphFactory()
    )
    
    registry.register(
        GraphType.HUMAN_INTERVIEW,
        HumanInterviewGraphFactory()
    )
    
    return registry

def get_graph_selector() -> GraphSelector:
    return GraphSelector()

def get_graph_runtime() -> GraphRuntime:
    return GraphRuntime(
        get_graph_registry(),
        get_graph_provider()
    )