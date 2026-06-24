from langchain_core.prompts import HumanMessagePromptTemplate


CONTEXT_SUMMARY_HUMAN = HumanMessagePromptTemplate.from_template(
"""
Conversation history:

{active_context}

Create a compressed working memory that retains all information necessary
to continue the interview effectively.
"""
)