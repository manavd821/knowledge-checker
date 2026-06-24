from langchain_core.prompts import HumanMessagePromptTemplate

HINT_GENERATION_HUMAN = HumanMessagePromptTemplate.from_template(
    """
Interview Configuration

Interview Type:
{topic_type}

Domain:
{domain}

Difficulty:
{current_difficulty}

AI Strictness:
{ai_strictness}

Session Brief:
{session_brief}

Custom Instructions:
{custom_instructions}

Current Question:
{current_question}

Candidate Response:
{user_transcript}

Conversation Context:
{active_context}

Generate a hint that helps the candidate progress without revealing the answer.
"""
)
