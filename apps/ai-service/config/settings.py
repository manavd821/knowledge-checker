from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from infrastructure import get_logger

logger = get_logger(__name__)

class Settings(BaseSettings):
    DATABASE_URL : str
    UPSTASH_REDIS_REST_URL: str
    UPSTASH_REDIS_REST_TOKEN: str
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

@lru_cache
def get_settings() -> Settings : 
    try:
        logger.info("loading environment variables...")
        settings = Settings() # type: ignore
        logger.info("environment variable loaded succesfully")
        return settings
    except Exception as e:
        print("Failed to load environment variables: ", e)
        raise
