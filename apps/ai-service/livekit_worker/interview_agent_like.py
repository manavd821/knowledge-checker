from typing import Protocol

class InterviewAgentLike(Protocol):
    
    async def handle_interviewer_response(
        self,
        response: str
    ) -> None:
        pass