from datetime import datetime
from uuid import UUID
from typing import Any

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Text,
    Double
)
from sqlalchemy.dialects.postgresql import JSONB 
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base
from typing import Any


class EvaluationSummary(Base):
    __tablename__ = "evaluation_summaries"

    evaluation_summary_id: Mapped[UUID] = mapped_column(
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

    overall_score: Mapped[float] = mapped_column(
        Double,
        nullable=False,
    )

    strength_areas: Mapped[list[dict[str, Any]] | None] = mapped_column(
        JSONB,
    )

    weak_areas: Mapped[list[dict[str, Any]] | None] = mapped_column(
        JSONB,
    )

    progression_notes: Mapped[str | None] = mapped_column(
        Text,
    )

    detailed_feedback: Mapped[str | None] = mapped_column(
        Text,
    )

    recommendations: Mapped[list[dict[str, Any]] | None] = mapped_column(
        JSONB,
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
            "evaluation_summaries_session_id_idx",
            "session_id",
        ),
    )