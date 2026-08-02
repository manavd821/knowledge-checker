import { ObservableStore } from "@/store/observable-store";
import { LocalParticipantVM, ParticipantState, ParticipantVM } from "@/store/types";

export class ParticipantStore extends ObservableStore<ParticipantState>{
    constructor(){
        super(
            {
                local: null,
                remote: new Map<string, ParticipantVM>(),
            },
            "participant"
        )
    }
    add_local_participant(participant: LocalParticipantVM){
        this.set(prev => ({
            ...prev,
            local: participant
        }));
    }
    add_remote_participant(participant: ParticipantVM){
        this.set(prev => {
            const remote = new Map(prev.remote);
            remote.set(participant.id, participant);
            return {
                ...prev,
                remote,
            }
        });
    }
}