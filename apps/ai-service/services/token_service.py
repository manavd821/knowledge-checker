from infrastructure import (
    get_logger,
    LLMProvider,
)
from langchain_core.messages.utils import count_tokens_approximately
from models import (
    LLMTask,
)
logger = get_logger(__name__)

class TokenService:
    def __init__(
        self,
        llm_provider : LLMProvider,
    ) -> None:
        self._llm_provider = llm_provider
    
    def count_tokens_get_model_for_task(
        self, 
        text : str,
        task : LLMTask,
    ) -> int:
        """
        expensive call. 
        May do api call and increase latency. Use only if needed
        """
        llm = self._llm_provider.get_model_for_task(task)
        try:
            count = llm.get_num_tokens(text)
        except NotImplementedError:
            count = count_tokens_approximately(text)
        return count
    
    def estimate_tokens(
        self, 
        text : str | None,
    ) -> int:
        """
        Returns approximate number of tokens using langchain's `count_tokens_approximately` method
        """
        return count_tokens_approximately(
            messages=text,
            chars_per_token=4.0,
            extra_tokens_per_message=3.0,
        ) if text else 0
    
        