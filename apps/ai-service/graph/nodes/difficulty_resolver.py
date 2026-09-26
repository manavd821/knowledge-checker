from models.enums import Difficulty
from models.graph_state import InterviewGraphState
from services.difficulty_service import DifficultyService
class DifficultyResolverNode:
    def __init__(
        self,
        difficulty_service: DifficultyService,
    ) -> None:
        self._difficulty_service = difficulty_service
        
    async def __call__(
        self,
        state: InterviewGraphState,
    ) -> dict:
        runtime = state.context.runtime
        difficulty = (
            Difficulty.EASY
            if runtime.fundamental_phase
            else self._difficulty_service.resolve_difficulty(
                state.context.session.difficulty,
                runtime.overall_score,
                runtime.previous_score,
            )
        )
        updated_runtime = runtime.model_copy(
            update={
                "current_difficulty": difficulty,
            }
        )
        updated_context = state.context.model_copy(
            update={
                "runtime" : updated_runtime,
            }
        )
        return {
            "context" : updated_context,
        }
    