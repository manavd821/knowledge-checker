import { IAIClient } from "@/ai/ai-client";
import get_logger from "@/lib/logging/logger-factory";
import { GenerateSessionBriefRequest } from "@/ai/dto/generate-session-brief.request";
import { GenerateSessionBriefResponse } from "@/ai/dto/generate-session-brief.response";


const logger = get_logger();
export class FastAPIAIClient implements IAIClient{
    generate_session_brief(data : GenerateSessionBriefRequest): GenerateSessionBriefResponse {
        logger.info("generate session brief");
        return {
            sessionBrief : "this is session brief",
            tokenCount : 10,
        }
    }
}