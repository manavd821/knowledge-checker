
from models import (
    Difficulty,
)


class DifficultyService:
    
    def __init__(self) -> None:
        self._order : list[Difficulty] = [
            Difficulty.EASY, 
            Difficulty.MEDIUM,
            Difficulty.HARD,
            Difficulty.EXPERT,
        ]
    
    def resolve_difficulty(
        self,
        defined_difficulty : Difficulty | None,
        overall_score : float | None,
        previous_score : float | None,
    ) -> Difficulty | None:
        if defined_difficulty is None:
            return
        if overall_score is None or previous_score is None:
            return defined_difficulty
        elif overall_score < 5 and previous_score < 5:
            step_below = 2
        elif overall_score >= 5 and previous_score < 5:
            step_below = 1
        else:
            step_below = 0
        
        curr_idx = self._order.index(defined_difficulty)
        new_idx = max(0, curr_idx-step_below)
        return self._order[new_idx]
        