import { env } from "@/config/env";
import { AccessToken, LiveKitAPI, TrackSource } from "livekit-server-sdk";
import { IRealTimeProvisioner } from "@/rtc/provisioning/realtime-provisioner";
import { Role } from "@/modules";

export class LivekitProvisioner implements IRealTimeProvisioner{

    private readonly livekit_api: LiveKitAPI;

    constructor(){
        this.livekit_api = new LiveKitAPI({
            host: env.LIVEKIT_URL,
            apiKey: env.LIVEKIT_API_KEY,
            secret: env.LIVEKIT_API_SECRET,
        });

    }

    async generate_token(
        room_id: string, 
        participant_identity: string,
        connection_id: string,
        role: Role,
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
            role,
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

    async dispatch_ai_agent(session_id: string){
        await this.livekit_api.agentDispatch.createDispatch(
        session_id,
        env.LIVEKIT_AGENT_NAME,
        {
            metadata: JSON.stringify({
                session_id,
            }),
        },
    );
    }
}