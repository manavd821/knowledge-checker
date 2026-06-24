from sqlalchemy.orm import (
    DeclarativeBase,
)
from sqlalchemy import Enum
class Base(DeclarativeBase):
    pass

def pg_value_enum(enum_cls, pg_name : str | None = None):
    return Enum(
        enum_cls,
        name = pg_name or enum_cls.__name__.lower(),
        values_callable=lambda obj: [e.value for e in obj],
        create_type=False,
    )