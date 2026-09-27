from stream_worker.handlers.base import IStreamEventHandler


class TurnHandler(IStreamEventHandler):
    
    async def handle(self, payload):
        pass