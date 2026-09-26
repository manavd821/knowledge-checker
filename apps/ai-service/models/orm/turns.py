from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    DateTime,
    Double,
    ForeignKey,
    Index,
    Integer,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base, pg_value_enum
from models.enums import (
    Speaker,
    ContentType,
    Difficulty,
)


class Turn(Base):
    __tablename__ = "turns"

    turn_id: Mapped[UUID] = mapped_column(
        primary_key=True,
        server_default="gen_random_uuid()",
    )

    session_id: Mapped[UUID] = mapped_column(
        ForeignKey(
            "sessions.session_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )
    participant_id: Mapped[UUID] = mapped_column(
        ForeignKey(
            "session_participants.participant_id",
            ondelete="CASCADE"
        ),
        nullable=True
    )
    turn_number: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    speaker: Mapped[Speaker] = mapped_column(
        pg_value_enum(
            Speaker,
            pg_name="speaker",
        ),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    content_type: Mapped[ContentType] = mapped_column(
        pg_value_enum(
            ContentType,
            pg_name="content_type",
        ),
        nullable=False,
    )

    user_audio_duration_sec: Mapped[float | None] = mapped_column(
        Double,
    )

    evaluation_score: Mapped[float | None] = mapped_column(
        Double,
    )

    evaluation_feedback: Mapped[str | None] = mapped_column(
        Text,
    )

    evaluation_rubric: Mapped[dict | None] = mapped_column(
        JSONB,
    )

    difficulty_applied: Mapped[Difficulty | None] = mapped_column(
        pg_value_enum(
            Difficulty,
            pg_name="difficulty",
        ),
    )

    tokens_used: Mapped[int | None] = mapped_column(
        Integer,
    )

    latency_ms: Mapped[int | None] = mapped_column(
        Integer,
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
            "turns_session_id_idx",
            "session_id",
        ),
        UniqueConstraint(
            "session_id",
            "turn_number",
            "speaker",
            name="session_turn_unique",
        ),
    )