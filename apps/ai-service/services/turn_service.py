from uuid import UUID

from events.payloads import CandidateTurnUpdated
from models.turns import CreateTurn
from repositories.turn import TurnRepository

class TurnService:
    def __init__(
        self,
        turn_repo: TurnRepository,
    ) -> None:
        self._turn_repo = turn_repo
        
    async def create_turn(
        self,
        session_id: UUID,
        turn: CreateTurn
    ):
        return await self._turn_repo.create_turn(
            session_id,
            turn,
        )
    
    async def update_candidate_turn(
        self,
        turn_id: UUID,
        data: CandidateTurnUpdated
    ):
        update = {
            "evaluation_score" : data.evaluation_score,
            "evaluation_feedback": data.evaluation_feedback,
            "evaluation_rubric": data.evaluation_rubric
        }
        await self._turn_repo.update_turn(
            turn_id=turn_id,
            data = update
        )