import { 
    LocalParticipantVM, 
    ParticipantVM 
} from "@/store/types/participant-view-model";

export interface ParticipantState{
    local: LocalParticipantVM | null;
    remote: Map<string, ParticipantVM>;
}