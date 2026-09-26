
from langchain_core.output_parsers import StrOutputParser
from llm.enums import Tasks
from llm.gateway import LLMGateway
from models.enums import (
    TopicType,
    Domain,
    AI_STRICTNESS,
    Difficulty
)
from prompts.registry import get_prompt


class HintService:
    task = Tasks.HINT_GEN
    def __init__(
        self,
        llm_gateway : LLMGateway,
    ) -> None:
        self._llm_gateway = llm_gateway
    
    def get_chain(self):
        llm = self._llm_gateway.get_model(self.task)
        prompt = get_prompt(self.task)
        return prompt | llm | StrOutputParser(name="HintService")
        
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
        chain = self.get_chain()
        return await chain.ainvoke({
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