

from graph.enums import GraphType
from models.sessions import SessionContext


class GraphSelector:
    def select(self, ctx: SessionContext):
        if ctx.session.session_type == "ai_session":
            return GraphType.AI_INTERVIEW
        elif ctx.session.session_type == "human_session":
            return GraphType.HUMAN_INTERVIEW
        else:
            raise ValueError(f"Unsupported session type: {ctx.session.session_type}")
        
