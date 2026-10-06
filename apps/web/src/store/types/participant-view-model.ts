import { ParticipantRole } from "@/store/types/participant-role";

export interface ParticipantVM{
    id: string;
    identity: string;
    role : ParticipantRole;
    cameraEnabled: boolean;
    micEnabled: boolean;
    speaking: boolean;
    videoTrack?: MediaStreamTrack;
    audioTrack?: MediaStreamTrack;
}
export interface LocalParticipantVM extends ParticipantVM {
    selectedMicId: string;
    selectedCameraId: string;
}