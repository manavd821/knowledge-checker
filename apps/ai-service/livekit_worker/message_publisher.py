from livekit.rtc import Room
from livekit_worker.models import DataChannelMesage


class RealtimeMessagePublisher:
    def __init__(self, room : Room):
        self.room = room

    async def publish(self, message: DataChannelMesage):
        
        data = message.model_dump_json().encode("utf-8")

        await self.room.local_participant.publish_data(
            data,
            reliable=True,
        )