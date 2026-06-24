from livekit.agents import (
    Agent,
    ChatContext,
    ChatMessage,
    StopResponse,
)
from langchain_core.runnables import RunnableConfig
from langgraph.types import Command
from graph.graph import get_graph_app
from infrastructure import get_logger
from exceptions.domain import (
    SessionNotFoundError,
)
from exceptions.infrastructure import (
    DatabaseError,
)
from exceptions.base import AppError

logger = get_logger(__name__)

class InterviewAgent(Agent):
    def __init__(self, session_id: str):
        super().__init__(instructions="")
        self.session_id = session_id
        
    async def on_user_turn_completed(
        self, 
        turn_ctx: ChatContext, 
        new_message: ChatMessage
    ) -> None:
        transcript = new_message.text_content
        if not transcript:
            raise StopResponse()
        
        logger.info("turn_completed", session_id=self.session_id, transcript_length=len(transcript))

        graph_app = await get_graph_app()
        config = RunnableConfig(
            configurable={
                "thread_id" : self.session_id,
            }
        )
        
        state = await graph_app.aget_state(config)
        if state.interrupts:
            graph_input = Command(resume=transcript)
        else:
            graph_input = {
                "session_id": self.session_id,
                "thread_id": self.session_id,
                "user_transcript": transcript,
            }
        interrupt_payload = None       
        try:
            async for event in graph_app.astream_events(
                graph_input,
                config,
                version="v2",
            ):
                event_name = event["event"]
                if event_name == "on_chain_start":
                    logger.info(
                        "node started",
                        node=event["name"],
                        session_id = self.session_id
                    )
                
                elif event_name == "on_chain_end":
                    logger.info(
                        "node completed",
                        node=event["name"],
                        session_id=self.session_id,
                    )

                elif event_name == "on_custom_event":
                    logger.info(
                        "custom event",
                        data=event["data"],
                        session_id=self.session_id,
                    )
                
            state = await graph_app.aget_state(config)
            
            if state.interrupts:
                interrupt_payload = state.interrupts[0].value
                logger.info(
                    "graph interrupted",
                    session_id=self.session_id,
                )

                await self.session.say(interrupt_payload["final_response"])
                return
            
            final_state = state.values
            final_response = final_state.get("final_response")
            if final_response:
                await self.session.say(
                final_response
            )

                        
        except SessionNotFoundError as e:
            logger.warning(
                "session not found",
                session_id=e.session_id,
            )
            await self.session.say(
                "Interview session not found."
            )
        except DatabaseError:

            logger.exception(
                "database failure"
            )

            await self.session.say(
                "Temporary system issue."
            )
        except AppError:
            logger.exception(
                "application error"
            )
            await self.session.say(
                "Something went wrong."
            )
        except Exception:
            logger.exception(
                "unexpected bug"
            )
            await self.session.say(
                "Unexpected internal error."
            )
        