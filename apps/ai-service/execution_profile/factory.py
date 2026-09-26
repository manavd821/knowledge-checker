from execution_profile.enums import ExecutionProfile
from execution_profile.provider.graph import GraphProvider


def get_graph_provider(
    default_variant: ExecutionProfile | None = None
) -> GraphProvider:
    if default_variant is None:
        default_variant = ExecutionProfile.BALANCED
        
    return GraphProvider(default_variant)