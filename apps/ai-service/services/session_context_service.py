from models.session_context import UpdateSessionContextModel
from repositories.session_context import SessionContextRepository


class SessionContextService:
    def __init__(
        self,
        repo: SessionContextRepository
    ) -> None:
        self._ctx_repo = repo
        
    async def create(
        self,
        session_id: str,
        data: UpdateSessionContextModel,  
    ) -> str:
        return await self._ctx_repo.create(
            session_id=session_id,
            data=data
        )
    
    async def update(
        self,
        session_id: str,
        data: UpdateSessionContextModel,  
    ) :
        return await self._ctx_repo.update(
            session_id=session_id,
            data=data
        )
        