import { env } from "@/config/env";
import { AccessToken, TrackSource } from "livekit-server-sdk";
import { IRealTimeProvisioner } from "@/rtc/provisioning/realtime-provisioner";

export class LivekitProvisioner implements IRealTimeProvisioner{
    async generate_token(
        room_id: string, 
        participant_identity: string,
        connection_id: string,
    ) : Promise<string>{
        const at = new AccessToken(
            env.LIVEKIT_API_KEY, 
            env.LIVEKIT_API_SECRET,
            {
                identity: participant_identity,
            }
        );
        at.metadata = JSON.stringify({
            connection_id,
        });
        at.addGrant({
            roomJoin: true,
            room: room_id,
            canPublish: true,
            canSubscribe: true,
            canPublishSources: [
                TrackSource.CAMERA, 
                TrackSource.MICROPHONE, 
                TrackSource.SCREEN_SHARE, 
                TrackSource.SCREEN_SHARE_AUDIO,
            ],
        });

        const token = await at.toJwt();
        return token;
    }
}