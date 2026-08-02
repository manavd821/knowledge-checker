"use client";

import { InterviewSessionManager } from "@/interview-session/interview-session-manager";
import { InterviewIntialization } from "@/interview-session/interview-session-types";
import { useAuth } from "@clerk/nextjs";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useInterviewIntialization = (
    session_id: string, 
    manager: InterviewSessionManager,
) : UseQueryResult<InterviewIntialization> => {

    const { 
        userId: user_id ,
        isLoaded,
        isSignedIn,
    } = useAuth();

    return useQuery({
        queryKey: ["interview-init", session_id, user_id],
        enabled: isLoaded && isSignedIn === true && !!user_id && !!session_id,
        queryFn : async () => {
            if (!user_id) {
                // This should be unreachable given `enabled`, but keeps TS happy
                throw new Error("Unauthorized access, user not found");
            }
            const [
            {
                connection_state,
                live_session_info,
            },
                user,
            ] = await Promise.all([
                manager.join(session_id),
                manager.get_user(user_id),
            ]);

            return {
                connection_state,
                live_session_info,
                user,
            }
        },
        staleTime: Infinity,
    })
}