import { 
    TopicType, 
    Difficulty,
    Domain,
    CustomInstructions,
} from "@/modules";

export interface GenerateSessionBriefRequest {
    topic_type : TopicType;
    difficulty: Difficulty;
    domain: Domain;
    custom_instructions?: CustomInstructions;
    // documents: Array[Document]
}