from pydantic import BaseModel, ConfigDict

class SessionContextSchema(BaseModel):
    
    model_config = ConfigDict(from_attributes=True)

    
    context_text: str
    context_token_count : int
    version : int