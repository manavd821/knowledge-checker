from abc import ABC, abstractmethod
from typing import Any


class IRedisDB(ABC):

    @abstractmethod
    async def healthcheck(self) -> None:
        raise NotImplementedError

    @abstractmethod
    async def set(
        self,
        key: str,
        data: Any,
        ttl_seconds: int,
    ) -> None:
        raise NotImplementedError

    @abstractmethod
    async def get(
        self,
        key: str,
    ) -> Any:
        raise NotImplementedError

    @abstractmethod
    async def exists(
        self,
        key: str,
    ) -> bool:
        raise NotImplementedError

    @abstractmethod
    async def hset(
        self,
        key: str,
        data: dict[str, Any],
        ttl_seconds: int,
    ) -> bool:
        raise NotImplementedError

    @abstractmethod
    async def hgetall(
        self,
        key: str,
    ) -> dict[str, Any]:
        raise NotImplementedError

    @abstractmethod
    async def delete(
        self,
        key: str,
    ) -> None:
        raise NotImplementedError