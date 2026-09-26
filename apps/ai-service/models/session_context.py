
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class SelectSessionContextModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    session_context_id : str
    session_id: str
    
    context_text: str
    context_token_count: int
    version: int
    
    created_at: datetime
    updated_at: datetime
    
class UpdateSessionContextModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    context_text: str
    context_token_count: int
    version: int
    