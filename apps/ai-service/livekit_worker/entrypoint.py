from uuid import UUID

from livekit.agents import (
    JobContext,
    AgentSession,
)
from livekit.plugins import (
    deepgram,
    cartesia,
)
from livekit.rtc import RemoteParticipant
from lib.logging.logging import get_logger
from livekit_worker.factory import create_interview_agent
from livekit_worker.lifespan import clean_up
from livekit_worker.models import ParticipantMetadata


logger = get_logger(__name__)

async def entrypoint(ctx : JobContext):
    ctx.add_shutdown_callback(clean_up)
    session_id = ctx.room.name
    logger.info("job_dispatch", session_id=session_id, job_id=ctx.job.id)

    
    @ctx.room.on("participant_connected")
    def on_participant_join(participant: RemoteParticipant):
        logger.info("participant_connected", session_id=session_id, identity=participant.identity)
    
    await ctx.connect()
    room_sid = await ctx.room.sid
    logger.info("worker_connected_to_room", session_id=session_id, room_sid=room_sid)

    participant = await ctx.wait_for_participant()
    participant_id = participant.identity
    metadata = ParticipantMetadata.model_validate_json(participant.metadata)

    
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
    agent = create_interview_agent(
        session_id=UUID(session_id),
        metadata=metadata,
        participant_id=participant_id,
    )
    await session.start(
        room=ctx.room,
        agent=agent,
    )