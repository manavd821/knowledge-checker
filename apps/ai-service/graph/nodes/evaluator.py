from typing import cast
from models.graph_state import InterviewGraphState
from models.turns import TurnEvaluation
from services.evaluation_service import EvaluationService
from services.token_service import TokenService

class EvalutorNode:
    def __init__(
        self,
        evaluation_service : EvaluationService,
        token_service : TokenService,
    ) -> None:
        self._evaluation_service = evaluation_service
        self._token_service = token_service
        
    async def __call__(
        self,
        state: InterviewGraphState,
    )-> dict:
        runtime = state.context.runtime
        session = state.context.session
        
        if runtime.questions_asked == 0:
            updated_active_context = runtime.active_context + (
                f"\ncandidate: {state.user_transcript}"
            )
            updated_context_tokens = self._token_service.estimate_tokens(
                    updated_active_context
                )
            updated_runtime_context = runtime.model_copy(
                update={
                    "active_context" : updated_active_context,
                    "context_tokens" : updated_context_tokens, 
                }
            )
            updated_context = state.context.model_copy(
                update={
                    "runtime" : updated_runtime_context,
                }
            )
            return {
                "context" : updated_context,
            }
        
        evaluation = await self._evaluation_service.evaluate_turn(
            topic_type=session.topic_type,
            session_brief=session.session_brief,
            domain=session.domain,
            difficulty=runtime.current_difficulty,
            ai_strictness=session.ai_strictness,
            custom_instructions=session.custom_instructions,
            question=state.current_question,
            answer=state.user_transcript,
            active_context=runtime.active_context,
        )
        ev = cast(TurnEvaluation, evaluation)
        new_overall_score = self._evaluation_service.compute_running_score(
            runtime.previous_score,
            runtime.questions_asked,
            new_score=ev.evaluation_score,
        )
        # update active context
        updated_active_context = runtime.active_context + (
            f"\ninterviewer: {runtime.current_question}"
            + f"\ncandidate: {state.user_transcript}"
        )
        updated_context_tokens = self._token_service.estimate_tokens(
            updated_active_context
        )
        updated_runtime_context = runtime.model_copy(
            update={
                "previous_score" : ev.evaluation_score,
                "overall_score" : new_overall_score,
                "active_context" : updated_active_context,
                "context_tokens" : updated_context_tokens, 
            }
        )
        updated_context = state.context.model_copy(
            update={
                "runtime" : updated_runtime_context,
            }
        )
        
        return {
            "context" : updated_context,
            "evaluation_score": ev.evaluation_score,
            "evaluation_feedback": ev.evaluation_feedback,
            "evaluation_rubric": ev.evaluation_rubric.model_dump(mode="json"),
        }