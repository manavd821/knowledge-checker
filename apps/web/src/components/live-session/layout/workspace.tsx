import { useParticipants } from "@/react/live-session/hooks/use-participants"
import { useTranscript } from "@/react/live-session/hooks/use-transcript";
import { ParticipantVM } from "@/store/types";
import { VideoTrack } from "../video-track";
import { AudioTrack } from "../audio-track";
import { useSessionManager } from "@/react/live-session/hooks/use-session-manager";
import { Button } from "@/components/ui/button";

function ParticipantCard({
    participant,
}: {
    participant: ParticipantVM;
}) {
    return (
        <div>
            <p>id: {participant.identity}</p>
            <p>role: {participant.role}</p>
            <p>
                Mic: {participant.micEnabled ? "On" : "Off"}
            </p>
            <p>
                Camera: {participant.cameraEnabled ? "On" : "Off"}
            </p>
            <AudioTrack track={participant.audioTrack} />
            <VideoTrack
                track={participant.videoTrack}
            />
        </div>
    );
}

const InterviewTranscript = () => {
    console.log("InterviewTranscript rendered");

    const transcript = useTranscript();

    console.log("transcript:", transcript);

    if(transcript.length === 0){
        return (
            <div>No Transcript</div>
        )
    }
    return (

        <div>
            {transcript.map((entry) => (
                <div key={entry.id}>
                    <span>{entry.speaker}</span>
                    <p>{entry.text}</p>
                </div>
            ))}
        </div>
    );
};

export function WorkSpace(){
    const participants = useParticipants();
    const sessionManager = useSessionManager();
    return (
        <>
            <div>Workspace</div>
            <div>
                <Button onClick={() => sessionManager.enableCamera()}>
                    Enable Video
                </Button>

                <Button onClick={() => sessionManager.disableCamera()}>
                    Disable Video
                </Button>

                <Button onClick={() => sessionManager.enableMicrophone()}>
                    Enable Audio
                </Button>

                <Button onClick={() => sessionManager.disableMicrophone()}>
                    Disable Audio
                </Button>
                <Button onClick={() => sessionManager.startAudio()}>
                    Enable Audio Playback
                </Button>
            </div>
                <div>
                {participants.local && (
                    <ParticipantCard
                        participant={participants.local}
                    />
                )}
                <div>-------------------------------</div>
                {[...participants.remote.values()].map(
                    participant => (
                        <ParticipantCard
                            key={participant.id}
                            participant={participant}
                            />
                        )
                    )}
            </div>
            <div>transcript-----</div>
            <InterviewTranscript/>
        </>
    )
}