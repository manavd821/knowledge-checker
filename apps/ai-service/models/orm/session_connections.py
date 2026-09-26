from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column
from uuid import UUID
from models.orm.base import Base, pg_value_enum
from models.enums import DisconnectReason


class SessionConnection(Base):
    __tablename__ = "session_connections"

    connection_id: Mapped[UUID] = mapped_column(
        primary_key=True,
        server_default="gen_random_uuid()",
    )

    participant_id: Mapped[UUID] = mapped_column(
        ForeignKey(
            "session_participants.participant_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )

    joined_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    left_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
    )

    duration_sec: Mapped[int | None] = mapped_column(
        Integer,
    )

    disconnect_reason: Mapped[DisconnectReason | None] = mapped_column(
        pg_value_enum(
            DisconnectReason,
            pg_name="disconnect_reason",
        ),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default="now()",
    )

    __table_args__ = (
        Index(
            "session_connections_participant_idx",
            "participant_id",
        ),
        Index(
            "session_connections_joined_at_idx",
            "joined_at",
        ),
    )