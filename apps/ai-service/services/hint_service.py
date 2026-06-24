
from langchain_core.output_parsers import StrOutputParser
from infrastructure import LLMProvider
from models import (
    LLMTask,
    TopicType,
    Domain,
    AI_STRICTNESS,
    Difficulty
)
from prompts.registry import get_prompt


class HintService:
    def __init__(
        self,
        llm_provider : LLMProvider,
    ) -> None:
        llm = llm_provider.get_model_for_task(LLMTask.HINT_GEN)
        prompt = get_prompt(LLMTask.HINT_GEN)
        self._chain = prompt | llm | StrOutputParser(name="HintService")
    
    async def generate_hint(
        self,
        topic_type : TopicType | None,
        current_difficulty : Difficulty | None,
        ai_strictness : AI_STRICTNESS | None,
        session_brief : str | None,
        custom_instructions : str | None,
        current_question : str | None,
        user_transcript : str | None,
        active_context : str | None,
        domain : Domain | None,
    ) -> str:
        return await self._chain.ainvoke({
            "topic_type" : topic_type,
            "current_difficulty" : current_difficulty,
            "ai_strictness" : ai_strictness,
            "session_brief" : session_brief,
            "custom_instructions" : custom_instructions,
            "current_question" : current_question,
            "user_transcript" : user_transcript,
            "active_context" : active_context,
            "domain" : str(domain),
        })