import { FastAPIAIClient } from "@/ai/fastapi-ai-client";

export function get_ai_client(){
    return new FastAPIAIClient();
}