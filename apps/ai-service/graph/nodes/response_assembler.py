from config.settings import get_settings
from models.graph_state import InterviewGraphState

class ResponseAssemblerNode:

    async def __call__(
        self,
        state: InterviewGraphState,
    ) -> dict:
        runtime = state.context.runtime
        settings = get_settings()
        
        final_response = state.next_question
        fundamental_phase = runtime.questions_asked < settings.FUNDAMENTAL_PHASE_COUNT
        
        updated_runtime_context = runtime.model_copy(
            update={
                "fundamental_phase" : fundamental_phase, 
            }
        )
        updated_context = state.context.model_copy(
            update={
                "runtime" : updated_runtime_context,
            }
        )
        return {
            "final_response" : final_response,
            "context" : updated_context,
        }
        