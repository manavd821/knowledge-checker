from lib.redis.stream.handlers.base import IStreamEventHandler
from lib.redis.stream.payloads import TurnCompletedPayload


class TurnHandler(IStreamEventHandler):
    
    async def handle(self, payload: TurnCompletedPayload):
        pass