from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Text,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column
from uuid import UUID
from models.orm.base import Base

class SessionContext(Base):
    __tablename__ = "session_context"

    session_context_id: Mapped[UUID] = mapped_column(
        primary_key=True,
        server_default="gen_random_uuid()",
    )

    session_id: Mapped[UUID] = mapped_column(
        ForeignKey(
            "sessions.session_id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
    )

    context_text: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    context_token_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    version: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        server_default="1",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default="now()",
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default="now()",
    )

    __table_args__ = (
        Index(
            "session_contexts_session_id_idx",
            "session_id",
        ),
    )