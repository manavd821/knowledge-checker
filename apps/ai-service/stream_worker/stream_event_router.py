import asyncio
from collections import defaultdict
from pydantic import BaseModel
from stream_worker.handlers.base import IStreamEventHandler
from stream_worker.stream_events import StreamEvent

class StreamEventRouter:
    def __init__(self) -> None:
        self._handlers : dict[
            StreamEvent,
            set[IStreamEventHandler]
        ] = defaultdict(set)
        self._background_tasks: set[asyncio.Task] = set()
        
    def register(self, event: StreamEvent, handler: IStreamEventHandler | list[IStreamEventHandler]):
        if isinstance(handler, list):
            self._handlers[event].update(handler)
        else:
            self._handlers[event].add(handler)
            
    async def handle_together(self, event: StreamEvent, payload: BaseModel):
        handlers = self._handlers[event]
        
        await asyncio.gather(
            *(handler.handle(payload) for handler in handlers)
        )
        
    async def handle_sync(self, event: StreamEvent, payload: BaseModel):
        handlers = self._handlers[event]
        for handler in handlers:
            await handler.handle(payload)
    
    async def handle_in_background(self, event: StreamEvent, payload: BaseModel):
        handlers = self._handlers[event]
        for handler in handlers:
            task = asyncio.create_task(handler.handle(payload))
            self._background_tasks.add(task)
            
            task.add_done_callback(self._background_tasks.discard)
        