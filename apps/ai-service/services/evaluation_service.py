from llm.enums import Tasks
from llm.gateway import LLMGateway
from models.enums import (
    TopicType,
    Difficulty,
    AI_STRICTNESS,
    Domain,
)
from models.turns import BehavioralTurnEvaluation, DebateTurnEvaluation, GeneralTurnEvaluation, TechnicalTurnEvaluation
from prompts.registry import get_prompt

class EvaluationService:
    task = Tasks.TURN_EVALUATION
    def __init__(
        self,
        llm_gateway : LLMGateway,
    ) -> None:
        self._llm_gateway = llm_gateway
    
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
        topic_type : TopicType,
        difficulty : Difficulty | None,
        ai_strictness : AI_STRICTNESS | None,
        question : str | None,
        answer : str | None,
        session_brief : str | None,
        active_context : str,
        domain : Domain | None,
        custom_instructions : str | None,
    ):
        schema = self._get_evaluation_schema(topic_type)
        llm = self._llm_gateway.get_structure_model(
            self.task,
            schema=schema,
        )
        prompt = get_prompt(self.task)
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
