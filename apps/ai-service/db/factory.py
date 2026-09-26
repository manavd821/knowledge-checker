from functools import lru_cache
from config.settings import get_settings
from db.database_builder import DatabaseBuilder
from db.base import Database

settings = get_settings()

@lru_cache
def get_database() -> Database:
    """Singleton — engine + sessionmaker built once"""
    return (
        DatabaseBuilder()
        .withConnectionString(settings.DATABASE_URL)
        .build()
    )
