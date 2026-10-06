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
import { ResumeSession } from "@/shared/dto/sessions/resume-session.dto";
import { ProviderEventRouter } from "@/rtc/events/provider-event-router";
import { handleParticipantJoin } from "@/rtc/events/handlers/participant-joined";
import { handleParticipantLeave } from "@/rtc/events/handlers/participant-leaved";
import { handleTrackSubscribed } from "@/rtc/events/handlers/track-subscribed";
import { handleTrackUnsubscribed } from "@/rtc/events/handlers/track-unsubscribed";

export class InterviewSessionManager{
    constructor(
        private readonly realtime_provider: IRealTimeProvider,
        private readonly message_router: MessageRouter,
        private readonly transcript_store: TranscriptStore,
        private readonly _participant_store: ParticipantStore,
        private readonly connection_service: ConnectionService,
        private readonly session_service: SessionService,
        private readonly user_service: UserService,
        private readonly provider_event_router: ProviderEventRouter,
    ){
        this.registerProviderEvents();
    }

    registerProviderEvents(){
        // livekit events related to participants
        this.provider_event_router.register(
            "participantJoined", 
            payload => handleParticipantJoin(
                payload,
                this._participant_store,
            )
        );
        this.provider_event_router.register(
            "participantLeft", 
            payload => handleParticipantLeave(
                payload,
                this._participant_store,
            )
        );
        this.provider_event_router.register(
            "trackSubscribed", 
            payload => handleTrackSubscribed(
                payload,
                this._participant_store,
            )
        );
        this.provider_event_router.register(
            "trackUnsubscribed", 
            payload => handleTrackUnsubscribed(
                payload,
                this._participant_store,
            )
        );
        // route to MessageRouter
        this.realtime_provider.on(
            "dataReceived",
            payload => {
                this.message_router.handle(
                    payload.message
                )
            }
        )
    }
    get participant_store() : ParticipantStore{
        return this._participant_store;
    }   

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
        await this.session_service.leave_session(connection_id);
    }
    async pause(session_id: string){
        const data = await this.session_service.pause_session(session_id);

        this.session_service.update_live_session_cache(
            session_id,
            {
                status : data.status,
            }
        )
        // notify all participants that session has paused through data channel

        return data;
    }
    async resume(session_id: string): Promise<ResumeSession> {
        const data = await this.session_service.resume_session(session_id);

        this.session_service.update_live_session_cache(
            session_id,
            {
                status : data.status,
            }
        )
        return data;
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

    async enableCamera() {
        await this.realtime_provider.enableCamera();
    }

    async disableCamera() {
        await this.realtime_provider.disableCamera();
    }

    async enableMicrophone() {
        await this.realtime_provider.enableMicrophone();
    }

    async disableMicrophone() {
        await this.realtime_provider.disableMicrophone();
    }
    async startAudio() {
        await this.realtime_provider.startAudio();
    }
}