import { IRealTimeProvider } from "@/rtc/provider/realtime-provider";
import { TypedEventEmitter } from "@/rtc/provider/typed-event-emitter";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";
import { SessionConnection } from "@/rtc/provider/types/session-connection";
import { 
    RemoteParticipant,
    RemoteTrack,
    RemoteTrackPublication,
    Room, 
    RoomEvent, 
    VideoPresets,
} from "livekit-client";

export class LivekitProvider 
    extends TypedEventEmitter<RealtimeProviderEvents>
    implements IRealTimeProvider
{
    private readonly room = new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults : {
            resolution: VideoPresets.h720.resolution,
        },
    });

    constructor(){
        super();
        this.registerRoomEvent();
    }
    registerRoomEvent(){
        // this.room.on(RoomEvent.TrackSubscribed, this.handleTrackSubscribe)
    }
    // private handleTrackSubscribe(
    //     track: RemoteTrack,
    //     publication: RemoteTrackPublication,
    //     participant: RemoteParticipant,
    // ){
    //     this.emit("", payload)
    // }
    async connect(connection: SessionConnection): Promise<string>{
        const { 
            token, 
            ws_url,
        } = connection;
        this.room.on(RoomEvent.ParticipantConnected, (participant) => {
            console.log("my console, participant_connected")
            console.log({participant})
        })
        this.room.on(RoomEvent.ParticipantDisconnected, (participant) => {
            console.log("my console, participant left");
            console.log({participant})
        })
        await this.room.connect(
            ws_url,
            token
        );
        console.log("Connected to the room: ", this.room.name);
        return this.room.name;
    }
}