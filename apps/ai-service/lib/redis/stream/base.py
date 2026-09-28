from abc import ABC, abstractmethod

class IRedisStream:
    def __init__(self) -> None:
        pass
    
    @abstractmethod
    async def add(
        self,
        key: str,
        fields: dict
    ):
        raise NotImplementedError()
    
    @abstractmethod
    async def read_group(
        self,
        key: str,
        group: str,
        consumer: str,
        count: int = 10,
        block: int = 5000,
    ):
        raise NotImplementedError

    @abstractmethod
    async def ack(
        self,
        key: str,
        group: str,
        message_id: str,
    ):
        raise NotImplementedError
    
    @abstractmethod
    async def ensure_group(
        self,
        key: str,
        group: str,
    ):
        raise NotImplementedError