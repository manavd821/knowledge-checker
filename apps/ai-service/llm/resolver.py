from typing import Dict

from llm.enums import Tasks
from llm.models import TaskConfig
from execution_profile.enums import ExecutionProfile

class LLMResolver:
    def __init__(self) -> None:
        self._registry : dict[tuple[Tasks, ExecutionProfile], TaskConfig] = {}
        
    def resolve(self, task: Tasks, profile: ExecutionProfile) -> TaskConfig :
        return self._registry[(task, profile)]
    
    def register(
        self, 
        task: Tasks, 
        profile: ExecutionProfile, 
        config: TaskConfig,
    ):
        self._registry[(task, profile)] = config