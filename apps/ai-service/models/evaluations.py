from pydoc import text
from typing import Literal
from pydantic import BaseModel


class StrengthArea(BaseModel):
    topic : str
    score : float
    evidence : str
    
class WeakArea(BaseModel):
    topic : str
    score : float
    severity : Literal["low", "medium", "high"]
    evidence : str
    
class Recommendation(BaseModel):
    topic: str
    priority: Literal["low", "medium", "high"]
    reason: str
    action_items: list[str]
    
class Evaluation(BaseModel):
    overall_score : float
    strength_areas : list[StrengthArea]
    weak_areas : list[WeakArea]
    progression_notes : str
    detailed_feedback : str
    recommendations : list[Recommendation]