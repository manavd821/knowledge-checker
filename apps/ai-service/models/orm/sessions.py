from datetime import datetime
import uuid
from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    func,
)
from sqlalchemy.orm import (
    Mapped,
    mapped_column,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from models.orm.base import (
    Base,
    pg_value_enum,
)
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
        pg_value_enum(
            STATUS,
            pg_name="status",
        ),
        nullable=False,
        default=STATUS.PENDING.value
    )
    
    session_type : Mapped[SessionType] = mapped_column(
        pg_value_enum(
            SessionType,
            pg_name="session_type",
        ),
        nullable=False,
    )
    topic_type : Mapped[TopicType] = mapped_column(
        pg_value_enum(
            TopicType,
            pg_name="topic_type",
        ),
        nullable=False,
    )
    role_level : Mapped[RoleLevel] = mapped_column(
        pg_value_enum(
            RoleLevel,
            pg_name="role_level",
        ),
        nullable=False,
    )
    difficulty : Mapped[Difficulty] = mapped_column(
        pg_value_enum(
            Difficulty,
            pg_name="difficulty",
        ),
        nullable=False,
    )
    domain : Mapped[Domain] = mapped_column(
        pg_value_enum(
            Domain,
            pg_name="domain",
        ),
        nullable=False,
    )
    custom_domain : Mapped[str | None] = mapped_column(
        nullable=True,
    )
    duration_minutes : Mapped[int] = mapped_column(
        nullable=False,
    )
    ai_strictness : Mapped[AI_STRICTNESS] = mapped_column(
        pg_value_enum(
            AI_STRICTNESS,
            pg_name="ai_strictness",
        ),
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