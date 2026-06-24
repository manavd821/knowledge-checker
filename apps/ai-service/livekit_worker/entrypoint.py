import asyncio

from livekit.agents import (
    JobContext,
    AgentSession,
    inference
)
from livekit.plugins import (
    deepgram,
    cartesia,
)
from livekit.rtc import RemoteParticipant
from infrastructure import get_logger
from services.session_lifecycle_service import (
    mark_session_started_if_needed,
)
from livekit_worker.agent import InterviewAgent


logger = get_logger(__name__)

async def entrypoint(ctx : JobContext):

    session_id = ctx.room.name
    logger.info("job_dispatch", session_id=session_id, job_id=ctx.job.id)
    # await mark_session_started_if_needed(
        #     session_id=session_id,
        #     worker_id=ctx.worker_id,
        #     room_sid_coroutine = ctx.room.sid,
        # )
    
    @ctx.room.on("participant_connected")
    def on_participant_join(participant: RemoteParticipant):
        logger.info("participant_connected", session_id=session_id, identity=participant.identity)
    await ctx.connect()
    room_sid = await ctx.room.sid
    logger.info("worker_connected_to_room", session_id=session_id, room_sid=room_sid)

    session = AgentSession(
        stt = deepgram.STT(
            model="nova-3",
            language="en-US",
        ),
        tts = cartesia.TTS(
            model="sonic-3",
            language="en",
        ),
    )
    await session.start(
        room=ctx.room,
        agent=InterviewAgent(
            session_id=session_id,
        )
    )