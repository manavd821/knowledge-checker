from models.graph_state import InterviewGraphState
from services.context_service import ContextService
from services.token_service import TokenService

class TranscriptAnalyzerNode:
    def __init__(
        self,
        token_service : TokenService,
        context_service: ContextService,
    ) -> None:
        self._token_service = token_service
        self._context_service = context_service
        
    async def __call__(
        self,
        state: InterviewGraphState,
    ) -> dict:
        transcript_tokens = self._token_service.estimate_tokens(
            state.user_transcript,
        )
        needs_summarization = self._context_service.decide_context_action(
            state.context.runtime.context_tokens,
        )
        
        return {
            "needs_summarization" : needs_summarization,
            "transcript_tokens" : transcript_tokens,
        }