from infrastructure import LLMProvider
from models import (
    LLMTask,
    TechnicalTurnEvaluation,
    BehavioralTurnEvaluation,
    DebateTurnEvaluation,
    GeneralTurnEvaluation,
    TopicType,
    Difficulty,
    AI_STRICTNESS,
    Domain,
)
from prompts.registry import get_prompt

class EvaluationService:
    def __init__(
        self,
        llm_provider : LLMProvider,
    ) -> None:
        self._llm_provider = llm_provider
    
    def _get_evaluation_schema(
        self,
        topic_type: TopicType,
    ):
        match topic_type:
            case TopicType.TECHNICAL:
                return TechnicalTurnEvaluation
            case TopicType.BEHAVIORAL:
                return BehavioralTurnEvaluation
            case TopicType.DEBATE:
                return DebateTurnEvaluation
            case TopicType.MOCK_INTERVIEW:
                return GeneralTurnEvaluation
            case TopicType.CUSTOM:
                return GeneralTurnEvaluation
            
    async def evaluate_turn(
        self,
        topic_type : TopicType | None,
        difficulty : Difficulty | None,
        ai_strictness : AI_STRICTNESS | None,
        question : str | None,
        answer : str | None,
        session_brief : str | None,
        active_context : str,
        domain : Domain | None,
        custom_instructions : str | None,
    ):
        if topic_type is None:
            raise ValueError("topic_type cannot be None")
        schema = self._get_evaluation_schema(topic_type)
        llm = self._llm_provider.get_structured_model_for_task(
            task=LLMTask.TURN_EVALUATION,
            schema=schema,
        )
        prompt = get_prompt(LLMTask.TURN_EVALUATION)
        chain = prompt | llm
        return await chain.ainvoke({
            "topic_type" : str(topic_type),
            "domain" : str(domain),
            "difficulty" : str(difficulty),
            "ai_strictness" : str(ai_strictness),
            "session_brief" : session_brief,
            "custom_instructions" : custom_instructions,
            "question" : question,
            "answer" : answer,
            "active_context" : active_context,
        })
    
    def compute_running_score(
        self,
        previous_overall : float | None,
        previous_count : int,
        new_score : float,
    ) -> float:
        if previous_count == 0 or previous_overall is None:
            return new_score
        return (
            previous_overall * previous_count
            + new_score
        ) / (previous_count + 1)
