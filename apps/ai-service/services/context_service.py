from langchain_core.output_parsers import StrOutputParser
from config.settings import get_settings
from llm.enums import Tasks
from llm.gateway import LLMGateway
from prompts.registry import get_prompt

class ContextService:
    
    task = Tasks.CONTEXT_SUMMARY
    
    def __init__(
        self,
        llm_gateway: LLMGateway,
    ) -> None:
        self._llm_gateway = llm_gateway

    def get_chain(
        self,
    ):
        llm = self._llm_gateway.get_model(self.task)
        prompt = get_prompt(self.task)
        return prompt | llm | StrOutputParser(name="ContextService")
        
    def decide_context_action(
        self,
        context_tokens : int,
    ) -> bool:
        settings = get_settings()
        return context_tokens > settings.THRESHOLD_SUMMARIZE
    
    async def summarize_ctx(self, active_context : str) -> str:
        chain = self.get_chain()
        return await chain.ainvoke({
            "active_context" : active_context,
        })