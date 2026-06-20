from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)
from sqlalchemy import (
    DateTime,
    Index,
    func,
)
from datetime import datetime
from models.orm.base import Base
from models.orm.sessions import Session

class User(Base):
    __tablename__ = "users"
    
    __table_args__ = (
        Index("users_user_id_idx", "user_id"),
    )
    
    
    user_id : Mapped[str] = mapped_column(primary_key=True)
    email : Mapped[str] = mapped_column(unique=True, nullable=False)
    first_name : Mapped[str | None] = mapped_column(nullable=True)
    last_name : Mapped[str | None] = mapped_column(nullable=True)
    created_at : Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )
    updated_at : Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        onupdate=func.now(),
    )