from graph.nodes.session_loader import session_loader_node
from graph.nodes.greet import greet_node
from graph.nodes.transcript_analyzer import transcript_analyzer_node
from graph.nodes.context_summarizer import context_summarizer_node
from graph.nodes.evaluator import evaluator_node
from graph.nodes.difficulty_resolver import difficulty_resolver_node
from graph.nodes.question_generator import question_generator_node
from graph.nodes.hint_generator import hint_generator_node
from graph.nodes.response_assembler import response_assembler_node
from graph.nodes.interrupt import interrupt_node
from graph.nodes.session_terminator import session_terminator_node

all_graph_nodes = {
    "session_loader" : session_loader_node,
    "greet" : greet_node,
    "transcript_analyzer" : transcript_analyzer_node,
    "context_summarizer" : context_summarizer_node,
    "evaluator" : evaluator_node, 
    "difficulty_resolver" : difficulty_resolver_node,
    "question_generator" : question_generator_node,
    "hint_generator" : hint_generator_node,
    "response_assembler" : response_assembler_node,
    "interrupt" : interrupt_node,
    "session_terminator" : session_terminator_node,
}