
from langchain_core.output_parsers import StrOutputParser
from infrastructure import LLMProvider
from models import (
    LLMTask,
    TopicType,
    Domain,
    AI_STRICTNESS,
    Difficulty,
)
from prompts.registry import get_prompt


class QuestionService:
    def __init__(
        self,
        llm_provider : LLMProvider,
    ) -> None:
        llm = llm_provider.get_model_for_task(task = LLMTask.QUESTION_GEN)
        prompt = get_prompt(LLMTask.QUESTION_GEN)
        self._chain = prompt | llm | StrOutputParser(name="QuestionService")
        
    async def generate_question(
        self,
        topic_type : TopicType | None,
        domain : str | None,
        current_difficulty : Difficulty | None,
        ai_strictness : AI_STRICTNESS | None,
        fundamental_phase : bool,
        session_brief : str | None,
        custom_instructions : str | None,
        overall_score : float | None,
        previous_score : float | None,
        active_context : str,
    ) -> str:
        return await self._chain.ainvoke({
            "topic_type" : topic_type,
            "domain" : str(domain),
            "current_difficulty" : str(current_difficulty),
            "ai_strictness" : str(ai_strictness),
            "fundamental_phase" : fundamental_phase,
            "session_brief" : session_brief,
            "custom_instructions" : custom_instructions,
            "overall_score" : overall_score,
            "previous_score" : previous_score,
            "active_context" : active_context,
        })