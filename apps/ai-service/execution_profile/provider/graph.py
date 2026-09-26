from typing import TypeVar, override

from execution_profile.enums import ExecutionProfile
from execution_profile.provider.base import IProfileProvider
from models.sessions import SessionContext


class GraphProvider(IProfileProvider):
    def __init__(self, default_variant: ExecutionProfile):
        self.default_variant = default_variant
    
    def select(
        self, 
        context: SessionContext
    ) -> ExecutionProfile:
        # write your conditions/rules
        
        # if context.session.ai_strictness == "strict":
        #     return ExecutionProfile.HIGH_QUALITY
        
        return ExecutionProfile.BALANCED