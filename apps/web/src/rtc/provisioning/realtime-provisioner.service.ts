import { env } from "@/config/env";
import { SessionConnection } from "@/rtc/provisioning/realtime-provisioner.types";
import { IRealTimeProvisioner } from "@/rtc/provisioning/realtime-provisioner";
import get_logger from "@/lib/logging/logger-factory";

export class RealTimeProvisionerService{
    constructor(private readonly provider: IRealTimeProvisioner){}

    async create_connection(
        room_id : string, 
        participant_id: string,
        connection_id: string,
    ): Promise<SessionConnection>{
        const logger = get_logger();
        logger.info("Creating connection for room", {room_id, participant_id});
        const token = await this.provider.generate_token(room_id, participant_id,connection_id);
        return {
            token,
            room_id,
            ws_url : env.LIVEKIT_URL,
        }
    }
}