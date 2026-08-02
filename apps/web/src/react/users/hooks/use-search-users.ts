import { get_frontend_service } from "@/frontend/factory";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetSearchUsers } from "@/shared/dto/users/search-user.dto";

export const useSearchUser = (search: string): UseQueryResult<GetSearchUsers> => {
    const session_service = get_frontend_service().sessions;

    return useQuery({
        queryKey: ["users", search],
        enabled: search.length > 0,
        queryFn: async () => {
            console.log("firing")
            if(!search.length) return [];
            return await session_service.search_user(search);
        }
    })
}