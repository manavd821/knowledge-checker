from langgraph.graph import (
    StateGraph,
    START,
    END,
)
from langgraph.checkpoint.redis import AsyncRedisSaver
from langgraph.checkpoint.memory import InMemorySaver
from config.settings import get_settings
from models import (
    InterviewGraphState,
)
from graph.nodes import all_graph_nodes
from graph.edges.routing import (
    route_initial_turn,
    route_context_summerization,
    route_response_generation,
    route_session_lifecycle,
)


def build_graph() -> StateGraph:
    graph = StateGraph(InterviewGraphState)
    for node_name, node in all_graph_nodes.items():
        graph.add_node(node_name, node)
    
    graph.add_edge(START, "session_loader")
    graph.add_conditional_edges(
        "session_loader",
        route_initial_turn,
    )
    graph.add_edge("greet", "response_assembler")
    
    graph.add_conditional_edges(
        "transcript_analyzer",
        route_context_summerization,
    )
    graph.add_edge("context_summarizer", "evaluator")
    graph.add_edge("evaluator", "difficulty_resolver")
    graph.add_conditional_edges(
        "difficulty_resolver",
        route_response_generation,
    )
    graph.add_edge("hint_generator", "response_assembler")
    graph.add_edge("question_generator", "response_assembler")
    
    graph.add_conditional_edges(
        "response_assembler",
        route_session_lifecycle,
    )
    graph.add_edge("interrupt", "transcript_analyzer")
    graph.add_edge("session_terminator", END)

    return graph

_compiled_app = None
async def get_graph_app():
    global _compiled_app
    if _compiled_app is None:
        settings = get_settings()
        checkpointer = AsyncRedisSaver(
            redis_url=settings.REDIS_URL,
        )
        await checkpointer.asetup()
        # checkpointer = InMemorySaver()
        _compiled_app = build_graph().compile(checkpointer=checkpointer)
    return _compiled_app

