from graph.enums import GraphType
from graph.graph_factory.base import IGraphFactory

class GraphRegistry:
    def __init__(self) -> None:
        self._factories : dict[
            GraphType,
            IGraphFactory
        ] = {}
    
    def register(
        self,
        graph_type: GraphType,
        factory: IGraphFactory,
    ):
        self._factories[graph_type] = factory
    
    def get(
        self,
        graph_type: GraphType
    ) -> IGraphFactory:
        factory = self._factories.get(graph_type)
        if factory is None:
            raise ValueError(f"Graph factory for type {graph_type} not found")
        return factory