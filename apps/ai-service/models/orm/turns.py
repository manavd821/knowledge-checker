from datetime import datetime
import uuid
from typing import Any

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Text,
    UniqueConstraint,
    Float,
    func,
)
from sqlalchemy.dialects.postgresql import (
    UUID as PG_UUID,
    JSONB,
)
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base
from models import (
    Speaker,
    ContentType,
    Difficulty,
)


class Turn(Base):
    __tablename__ = "turns"

    __table_args__ = (
        Index(
            "turns_session_id_idx",
            "session_id",
        ),
        UniqueConstraint(
            "session_id",
            "turn_number",
            name="session_turn_unique",
        ),
    )

    turn_id: Mapped[uuid.UUID] = mapped_column(
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
    )

    turn_number: Mapped[int] = mapped_column(
        nullable=False,
    )

    speaker: Mapped[Speaker] = mapped_column(
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    content_type: Mapped[ContentType] = mapped_column(
        nullable=False,
    )

    user_audio_duration_sec: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    evaluation_score: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    evaluation_feedback: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    evaluation_rubric: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    difficulty_applied: Mapped[Difficulty | None] = mapped_column(
        nullable=True,
    )

    tokens_used: Mapped[int | None] = mapped_column(
        nullable=True,
    )

    latency_ms: Mapped[int | None] = mapped_column(
        nullable=True,
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