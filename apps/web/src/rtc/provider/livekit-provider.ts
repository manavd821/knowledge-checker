import { IRealTimeProvider } from "@/rtc/provider/realtime-provider";
import { TypedEventEmitter } from "@/rtc/provider/typed-event-emitter";
import { RealtimeProviderEvents } from "@/rtc/events/realtime-provider-events";
import { SessionConnection } from "@/rtc/provider/types/session-connection";
import { 
    LocalParticipant,
    RemoteParticipant,
    Room, 
    RoomEvent, 
    VideoPresets,
    RemoteTrack,
    RemoteTrackPublication,
    LocalTrackPublication,
    Track,
} from "livekit-client";
import { ParticipantVM } from "@/store/types";
import { DataChannelMessage } from "@/messaging/types";

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

    private readonly encoder = new TextEncoder();
    private readonly decoder = new TextDecoder();

    constructor(){
        super();
        this.registerRoomEvent();
    }
    private toParticipantVM(
        participant: RemoteParticipant
    ) : ParticipantVM {
        const metadata = participant.metadata
            ? JSON.parse(participant.metadata)
            : {};
        return {
            id: participant.sid,
            identity: participant.identity,
            role: metadata.role,
            cameraEnabled: participant.isCameraEnabled,
            micEnabled: participant.isMicrophoneEnabled,
            speaking: participant.isSpeaking
        }
    }
    private toLocalParticipantVM(
        participant: LocalParticipant,
    ): ParticipantVM {
        const metadata = participant.metadata
            ? JSON.parse(participant.metadata)
            : {};

        return {
            id: participant.sid,
            identity: participant.identity,
            role: metadata.role,
            cameraEnabled: participant.isCameraEnabled,
            micEnabled: participant.isMicrophoneEnabled,
            speaking: participant.isSpeaking,
        };
    }


    registerRoomEvent(){
        this.room.on(
            RoomEvent.ParticipantConnected, 
            this.handleParticipantConnected
        );
        this.room.on(
            RoomEvent.ParticipantDisconnected,
            this.handleParticipantDisconnected,
        );
        this.room.on(
            RoomEvent.DataReceived,
            this.handleDataRecieved,
        );
        this.room.on(
        RoomEvent.TrackSubscribed,
            this.handleTrackSubscribed
        );

        this.room.on(
            RoomEvent.TrackUnsubscribed,
            this.handleTrackUnsubscribed
        );
        this.room.on(
            RoomEvent.AudioPlaybackStatusChanged, 
            this.handlePlaybackBlocked
        );
    }
    private handleParticipantConnected = (
        participant: RemoteParticipant,
    ) => {
        const participant_vm =
            this.toParticipantVM(participant);

        this.emit("participantJoined", {
            participant: participant_vm,
            isLocal: false,
        });
    };

    private handleParticipantDisconnected = (
        participant: RemoteParticipant,
    ) => {
        console.log(
            "LIVEKIT: participant disconnected",
            participant.identity
        );

        this.emit("participantLeft", {
            sid: participant.sid,
        });
    };

    private handleDataRecieved = (
        payload: Uint8Array,
        participant?: RemoteParticipant,
    ) => {
        const message = JSON.parse(
            this.decoder.decode(payload)
        ) as DataChannelMessage;

        this.emit("dataReceived", {
            message,
            sender_id: participant?.identity,
        });
    };
    private handlePlaybackBlocked = () => {
        if (!this.room.canPlaybackAudio) {
            this.emit("audioPlaybackBlocked", undefined); 
        }
    }

    private handleTrackSubscribed = (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant,
    ) => {
        console.log(
            "TRACK SUBSCRIBED",
            {
                participant: participant.identity,
                sid: participant.sid,
                kind: track.kind,
                source: publication.source,
            }
        );

        if (
            track.kind !== Track.Kind.Video &&
            track.kind !== Track.Kind.Audio
        ) {
            return;
        }
        const source =
            publication.source === Track.Source.Camera
                ? "camera"
                : publication.source === Track.Source.Microphone
                    ? "microphone"
                    : null;
        if (!source) {
            return;
        }

        this.emit("trackSubscribed", {
            participant_id: participant.sid,
            source,
            track: track.mediaStreamTrack,
        });

    }

    private handleTrackUnsubscribed = (
        track: RemoteTrack,
        publication: RemoteTrackPublication,
        participant: RemoteParticipant,
    ) => {
        const source =
            publication.source === Track.Source.Camera
                ? "camera"
                : publication.source === Track.Source.Microphone
                    ? "microphone"
                    : null;

        if (!source) {
            return;
        }

        this.emit("trackUnsubscribed", {
            participant_id: participant.sid,
            source,
        });
    };

    async connect(connection: SessionConnection): Promise<string>{
        const { 
            token, 
            ws_url,
        } = connection;
        await this.room.connect(
            ws_url,
            token
        );
        this.emit("connected", undefined);
        console.log("Connected to the room: ", this.room.name);
        // emit local participant joined
        this.emit("participantJoined", {
            participant:
                this.toLocalParticipantVM(
                    this.room.localParticipant,
                    
                ),
            isLocal: true,
        });

        // emit event for already joined participants
        this.room.remoteParticipants.forEach(
            participant => {
                this.handleParticipantConnected(participant);
                participant.trackPublications.forEach(pub => {
                if (pub.isSubscribed && pub.track) {
                    this.handleTrackSubscribed(
                        pub.track as RemoteTrack,
                        pub as RemoteTrackPublication,
                        participant,
                    );
                }
            });

            }
        )
        return this.room.name;
    };

    async disconnect(): Promise<void> {
        await this.room.disconnect();

        this.emit("disconnected", undefined);
    };

    async enableCamera() : Promise<void>{
        await this.room.localParticipant.setCameraEnabled(true);
    };

    async disableCamera(): Promise<void> {
        await this.room.localParticipant.setCameraEnabled(false);
    }

    async enableMicrophone(): Promise<void> {
        await this.room.localParticipant.setMicrophoneEnabled(true);
    }

    async disableMicrophone(): Promise<void> {
        await this.room.localParticipant.setMicrophoneEnabled(false);
    }
    async startAudio() {
        await this.room.startAudio();
    }

}