from datetime import datetime
import uuid
from typing import Any

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Float,
    Index,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import (
    UUID as PG_UUID,
    JSONB,
)
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base


class EvaluationSummary(Base):
    __tablename__ = "evaluation_summaries"

    __table_args__ = (
        Index(
            "evaluation_summaries_session_id_idx",
            "session_id",
        ),
    )

    evaluation_summary_id: Mapped[uuid.UUID] = mapped_column(
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

    overall_score: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    strength_areas: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    weak_areas: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    progression_notes: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    detailed_feedback: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    recommendations: Mapped[dict[str, Any] | None] = mapped_column(
        JSONB,
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