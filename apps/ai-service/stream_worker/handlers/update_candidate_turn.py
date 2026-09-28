from pydantic import BaseModel

from events.payloads import CandidateTurnUpdated
from services.turn_service import TurnService
from stream_worker.handlers.base import IStreamEventHandler

from lib.logging.logging import get_logger

logger = get_logger(__name__)

class UpdateCandidateTurnHandler(IStreamEventHandler):
    
    def __init__(
            self,
            turn_service: TurnService          
        ) -> None:
            self._turn_service = turn_service
            
    async def handle(self, payload: BaseModel):
        if not isinstance(payload, CandidateTurnUpdated):
            raise ValueError(f"Invalid payload type for UpdateCandidateTurnHandler: {type(payload)}")
        try:
            await self._turn_service.update_candidate_turn(
                turn_id=payload.turn_id,
                data=payload,
            )
            logger.info(f"Successfully updated candidate turn with ID: {payload.turn_id}")
        except Exception as e:
            logger.error(f"Error updating candidate turn with ID: {payload.turn_id}. Error: {str(e)}")
            raise