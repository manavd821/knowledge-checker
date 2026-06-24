from langchain_core.prompts import HumanMessagePromptTemplate

TURN_EVALUATION_HUMAN = HumanMessagePromptTemplate.from_template(
    """
Interview Type:
{topic_type}

Domain:
{domain}

Difficulty:
{difficulty}

AI Strictness:
{ai_strictness}

Session Brief:
{session_brief}

Custom Instructions:
{custom_instructions}

Question:
{question}

Candidate Answer:
{answer}

Relevant Context:
{active_context}

Evaluate the candidate's answer using the rubric appropriate for the interview type.
"""
)