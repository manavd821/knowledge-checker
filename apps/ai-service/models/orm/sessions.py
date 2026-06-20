from datetime import datetime
import uuid
from sqlalchemy import (
    DateTime,
    ForeignKey,
    Enum,
    Index,
    func,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from models.orm.base import Base
from models import (
    SessionType,
    STATUS,
    AI_STRICTNESS,
    TopicType,
    RoleLevel,
    Difficulty,
    Domain,
)

class Session(Base):
    __tablename__ = "sessions"
    
    __table_args__ = (
        Index("sessions_user_id_idx", "user_id"),
        Index("session_status_idx", "status"),
    )
    
    session_id : Mapped[uuid.UUID] = mapped_column(
        PG_UUID(as_uuid=True), 
        primary_key=True,
        default=uuid.uuid4
    )
    user_id : Mapped[str] = mapped_column(
        ForeignKey(
            "users.user_id",
            ondelete="CASCADE",
        ),
        nullable=False,
    )
    status : Mapped[STATUS] = mapped_column(
        Enum(STATUS),
        nullable=False,
        default=STATUS.PENDING.value
    )
    
    session_type : Mapped[SessionType] = mapped_column(
        Enum(SessionType),
        nullable=False,
    )
    topic_type : Mapped[TopicType] = mapped_column(
        Enum(TopicType),
        nullable=False,
    )
    role_level : Mapped[RoleLevel] = mapped_column(
        Enum(RoleLevel),
        nullable=False,
    )
    difficulty : Mapped[Difficulty] = mapped_column(
        Enum(Difficulty),
        nullable=False,
    )
    domain : Mapped[Domain] = mapped_column(
        Enum(Domain),
        nullable=False,
    )
    custom_domain : Mapped[str | None] = mapped_column(
        nullable=True,
    )
    duration_minutes : Mapped[int] = mapped_column(
        nullable=False,
    )
    ai_strictness : Mapped[AI_STRICTNESS] = mapped_column(
        Enum(AI_STRICTNESS),
        nullable=False,
    )
    realtime_transcript : Mapped[bool] = mapped_column(
        nullable=False,
        default=True,
    )
    ai_hints_enabled : Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
    )
    camera_required : Mapped[bool] = mapped_column(
        nullable=False,
        default=False,
    )
    custom_instructions : Mapped[str | None] = mapped_column(
        nullable=True,
    )
    session_brief : Mapped[str | None] = mapped_column(
        nullable=True,
    )
    session_brief_tokens : Mapped[int | None] = mapped_column(
        nullable=True,
    )

    scheduled_at : Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )
    started_at : Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    ended_at : Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    actual_duration_sec : Mapped[int | None] = mapped_column(
        nullable=True,
    )

    overall_score : Mapped[float | None] = mapped_column(
        nullable=True,
    )
    total_turns : Mapped[int] = mapped_column(
        nullable=False,
        default=0
    )
    questions_asked : Mapped[int] = mapped_column(
        nullable=False,
        default=0
    )
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