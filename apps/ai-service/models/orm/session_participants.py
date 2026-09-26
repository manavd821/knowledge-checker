
from datetime import datetime
from uuid import UUID

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base, pg_value_enum
from models.enums import ROLE

class SessionParticipant(Base):
    __tablename__ = "session_participants"

    participant_id: Mapped[UUID] = mapped_column(
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

    user_id: Mapped[str] = mapped_column(
        ForeignKey(
            "users.user_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    role: Mapped[ROLE] = mapped_column(
        pg_value_enum(
            ROLE,
            pg_name="role",
        ),
        nullable=False,
    )

    completed_duration_sec: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        server_default="0",
    )

    first_joined_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    left_session_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
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
        UniqueConstraint(
            "session_id",
            "user_id",
            name="session_participants_session_user_unique",
        ),
        Index(
            "session_participants_session_idx",
            "session_id",
        ),
        Index(
            "session_participants_user_idx",
            "user_id",
        ),
    )