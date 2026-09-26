from datetime import datetime

from sqlalchemy import Text, DateTime, Index
from sqlalchemy.orm import Mapped, mapped_column

from models.orm.base import Base


class User(Base):
    __tablename__ = "users"

    user_id: Mapped[str] = mapped_column(
        Text,
        primary_key=True,
    )

    email: Mapped[str] = mapped_column(
        Text,
        nullable=False,
        unique=True,
    )

    first_name: Mapped[str | None] = mapped_column(
        Text,
    )

    last_name: Mapped[str | None] = mapped_column(
        Text,
    )

    image_url: Mapped[str | None] = mapped_column(
        Text,
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
            "users_user_id_idx",
            "user_id",
        ),
    )