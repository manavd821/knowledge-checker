import { ConnectionService } from "@/connection/connection-service";
import { MessageRouter } from "@/messaging/message-router";
import { IRealTimeProvider } from "@/rtc/provider/realtime-provider";
import { ParticipantStore } from "@/store/participant-store";
import { TranscriptStore } from "@/store/transcript-store";
import { SessionService } from "@/frontend/services/sessions.service";
import { UserService } from "@/frontend/services/users.service";
import { GetUser } from "@/shared/dto/users/get-user.dto";
import { LiveSessionInfo, LiveSessionInfoSchema } from "@/modules";
import { ConnectionState } from "@/interview-session/interview-session-types";
import { ConnectionStateSchema } from "@/interview-session/interview-session-schema";
import { CreateConnection } from "@/shared/dto/sessions/create-connection.dto";

export class InterviewSessionManager{
    constructor(
        private readonly realtime_provider: IRealTimeProvider,
        private readonly message_router: MessageRouter,
        private readonly transcript_store: TranscriptStore,
        private readonly participant_store: ParticipantStore,
        private readonly connection_service: ConnectionService,
        private readonly session_service: SessionService,
        private readonly user_service: UserService,
    ){}
    async join(session_id: string) : Promise<{
        connection_state: ConnectionState,
        live_session_info: LiveSessionInfo,
    }>{
        const data = await this.session_service.get_connection_info(session_id)
        const { 
            token, 
            ws_url, 
        } = data;
        console.log("Succefully got the connection data");
        // console.log({data});

        const room_name = await this.realtime_provider.connect({
            token,
            ws_url,
        });
        // cache connection state and live session info
        const connection_state = ConnectionStateSchema.parse({
            ...data,
            room_name,
        });
        this.session_service.set_connection_state(session_id, connection_state);
        const live_session_info = LiveSessionInfoSchema.parse(data);
        this.session_service.set_live_session_info(session_id, live_session_info);
        return {
            connection_state,
            live_session_info,
        };
    }
    async leave(connection_id: string){
        this.session_service.leave_session(connection_id);
    }
    async get_user(user_id: string) : Promise<GetUser>{
        const user = await this.user_service.get_user(user_id);
        if(!user){
            throw new Error(`User  not found`)
        }
        return user;
    }
    
    async get_user_and_session_info(user_id: string, session_id: string) : Promise<{
        user: GetUser,
        session: LiveSessionInfo,
    }>{
        const [ user, session ] = await Promise.all([
            this.user_service.get_user(user_id),
            this.session_service.get_live_session_info(session_id),
        ]);
        if(!user){
            throw new Error(`User  not found`,)
        }
        if(!session){
            throw new Error(`Session not found`,)
        }
        return {
            user, 
            session,
        }
    }
}