
from pydantic import (
    BaseModel,
    ConfigDict,
    Field,
)

from models.enums import (
    ContentType,
    Difficulty, 
    Speaker,
    TopicType,
)
from enum import Enum
    
class EvaluationRubric_Technical(BaseModel):
    technical_accuracy : float = Field(
        description="Score from 0.0 to 10.0 measuring correctness of technical concepts, facts, terminology, and explanations.",
        ge=0.0,
        le=10.0,
    )
    depth_of_knowledge : float = Field(
        description="Score from 0.0 to 10.0 measuring depth of understanding beyond basic definitions and memorized facts.",
        ge=0.0,
        le=10.0,
    )
    problem_solving : float = Field(
        description="Score from 0.0 to 10.0 measuring reasoning ability, analytical thinking, and problem-solving approach.",
        ge=0.0,
        le=10.0,
    )
    communication_clarity : float = Field(
        description="Score from 0.0 to 10.0 measuring clarity, structure, and understandability of the explanation.",
        ge=0.0,
        le=10.0,
    )

class EvaluationRubric_Behavioral(BaseModel):
    communication_clarity: float = Field(
        description="Score from 0.0 to 10.0 measuring clarity and coherence of communication.",
        ge=0.0,
        le=10.0,
    )
    structure_of_answer: float = Field(
        description="Score from 0.0 to 10.0 measuring organization, flow, and logical structure of the response.",
        ge=0.0,
        le=10.0,
    )
    relevance: float = Field(
        description="Score from 0.0 to 10.0 measuring how directly the answer addresses the question.",
        ge=0.0,
        le=10.0,
    )
    professionalism: float = Field(
        description="Score from 0.0 to 10.0 measuring professionalism, maturity, and appropriateness of the response.",
        ge=0.0,
        le=10.0,
    )

class EvaluationRubric_Debate(BaseModel):
    argument_quality: float = Field(
        description="Score from 0.0 to 10.0 measuring strength, logic, and consistency of arguments",
        ge=0.0,
        le=10.0,
    )
    evidence_usage: float = Field(
        description="Score from 0.0 to 10.0 measuring use of evidence, examples, facts, or supporting reasoning",
        ge=0.0,
        le=10.0,
    )
    rebuttal_strength: float = Field(
        description="Score from 0.0 to 10.0 measuring effectiveness in addressing opposing viewpoints and counterarguments",
        ge=0.0,
        le=10.0,
    )
    communication_clarity: float = Field(
        description="Score from 0.0 to 10.0 measuring clarity and persuasiveness of communication",
        ge=0.0,
        le=10.0,
    )

class EvaluationRubric_General(BaseModel):
    knowledge: float = Field(
        description="Score from 0.0 to 10.0 measuring demonstrated knowledge of the subject",
        ge=0.0,
        le=10.0,
    )
    reasoning: float = Field(
        description="Score from 0.0 to 10.0 measuring reasoning, analysis, and thought process",
        ge=0.0,
        le=10.0,
    )
    communication_clarity: float = Field(
        description="Score from 0.0 to 10.0 measuring clarity and effectiveness of communication.",
        ge=0.0,
        le=10.0,
    )
    confidence: float = Field(
        description="Score from 0.0 to 10.0 measuring confidence and conviction shown in the response",
        ge=0.0,
        le=10.0,
    )

class BaseTurnEvaluation(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
        from_attributes=True,
    )
    
    evaluation_score: float = Field(
        description="Overall answer quality score from 0.0 to 10.0.",
        ge=0.0,
        le=10.0,
    )
    evaluation_feedback: str  = Field(
        description="Concise actionable feedback describing strengths, weaknesses, and suggested improvements.",
    )
    difficulty_applied: Difficulty
    
class TechnicalTurnEvaluation(BaseTurnEvaluation):
    evaluation_rubric: EvaluationRubric_Technical

class DebateTurnEvaluation(BaseTurnEvaluation):
    evaluation_rubric: EvaluationRubric_Debate

class BehavioralTurnEvaluation(BaseTurnEvaluation):
    evaluation_rubric: EvaluationRubric_Behavioral

class GeneralTurnEvaluation(BaseTurnEvaluation):
    evaluation_rubric : EvaluationRubric_General

TurnEvaluation = (
    TechnicalTurnEvaluation 
    | DebateTurnEvaluation
    | BehavioralTurnEvaluation
    | GeneralTurnEvaluation
)
    
class CreateTurn(BaseModel):
    model_config = ConfigDict(
        use_enum_values=True,
        from_attributes=True,
    )
    
    turn_number : int
    speaker : Speaker
    content : str
    content_type : ContentType
    
    user_audio_duration_sec : float | None = None
    
    turn_evaluation : TurnEvaluation | None = None
    
    tokens_used : int | None = None
    latency_ms : int | None = None
    