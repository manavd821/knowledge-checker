from abc import ABC, abstractmethod

from pydantic import BaseModel
from typing import Any, Generic, TypeVar



class IStreamEventHandler(ABC):
    @abstractmethod
    async def handle(self, payload: Any) -> None:
        pass