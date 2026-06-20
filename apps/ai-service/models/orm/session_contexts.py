from datetime import datetime
import uuid

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    func,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base


class SessionContext(Base):
    __tablename__ = "session_context"

    __table_args__ = (
        Index(
            "session_contexts_session_id_idx",
            "session_id",
        ),
    )

    session_context_id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    session_id: Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True),
        ForeignKey(
            "sessions.session_id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
    )

    context_text: Mapped[str] = mapped_column(
        nullable=False,
    )

    context_token_count: Mapped[int] = mapped_column(
        nullable=False,
    )

    version: Mapped[int] = mapped_column(
        nullable=False,
        default=1,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )