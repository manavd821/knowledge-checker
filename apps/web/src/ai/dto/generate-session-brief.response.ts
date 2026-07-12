import { 
    TopicType, 
    Difficulty,
    Domain,
    CustomInstructions,
} from "@/modules";

export interface GenerateSessionBriefResponse {
    sessionBrief: string;
    tokenCount: number;

}