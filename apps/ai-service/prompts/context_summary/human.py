from langchain_core.prompts import HumanMessagePromptTemplate

CONTEXT_SUMMARY_HUMAN = HumanMessagePromptTemplate.from_template(
    """
Conversation history:

{active_context}

Create a compressed working memory for the next interview turns.

The summary MUST be substantially shorter than the conversation history.
Target: 500-800 tokens.
Hard maximum: 1000 tokens.
"""
)