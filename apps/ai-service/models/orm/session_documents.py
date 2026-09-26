from datetime import datetime

from sqlalchemy import (
    DateTime,
    ForeignKey,
    Index,
    Integer,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.orm import Mapped, mapped_column
from uuid import UUID

from models.orm.base import (
    Base,
    pg_value_enum,
)
from models.enums import FileType

class SessionDocument(Base):
    __tablename__ = "session_documents"

    session_document_id: Mapped[UUID] = mapped_column(
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

    file_name: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    file_type: Mapped[FileType] = mapped_column(
        pg_value_enum(
            FileType,
            pg_name="file_type",
        ),
        nullable=False,
    )

    storage_url: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    extracted_text: Mapped[str | None] = mapped_column(
        Text,
    )

    token_count: Mapped[int | None] = mapped_column(
        Integer,
    )

    uploaded_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default="now()",
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
            "session_documents_session_id_idx",
            "session_id",
        ),
    )