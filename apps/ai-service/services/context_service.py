from langchain_core.output_parsers import StrOutputParser
from config.settings import get_settings
from infrastructure import LLMProvider
from models import (
    LLMTask,
)
from repositories import (
    SessionContextRepository,
    CacheRepository,
)
from services.token_service import TokenService
from prompts.registry import get_prompt


class ContextService:
    def __init__(
        self,
        llm_provider : LLMProvider,
        token_service : TokenService,
    ) -> None:
        self._llm = llm_provider.get_model_for_task(LLMTask.CONTEXT_SUMMARY)
        self._token_service = token_service
        self._prompt = get_prompt(LLMTask.CONTEXT_SUMMARY)
        self._chain = self._prompt | self._llm | StrOutputParser(name="ContextService")
        
    def decide_context_action(
        self,
        context_tokens : int,
    ) -> bool:
        settings = get_settings()
        return context_tokens > settings.THRESHOLD_SUMMARIZE
    
    async def _summarize(self, active_context : str) -> str:
        return await self._chain.ainvoke({
            "active_context" : active_context,
        })
    async def summarize_and_update(
        self,
        session_id : str,
        active_context : str,
        repo : SessionContextRepository,
    ) -> str:
        context_summary = await self._summarize(active_context)
        context_token_count = self._token_service.estimate_tokens(context_summary)
        # update it into session_context
        session_context = await repo.get_session_context_by_session_id(session_id)
        if session_context is None:
            await repo.create_session_context(
                session_id=session_id,
                context_text=context_summary,
                context_token_count=context_token_count,
                version=1,
            )
        else:
            await repo.update_session_context_by_session_id(
                session_id=session_id,
                context_text=context_summary,
                context_token_count=context_token_count,
                version=session_context.version,
            )
        return context_summary
    