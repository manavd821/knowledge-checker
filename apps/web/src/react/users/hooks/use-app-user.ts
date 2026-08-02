import { get_frontend_service } from "@/frontend/factory";
import { GetUser } from "@/shared/dto/users/get-user.dto";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useAppUser = (user_id: string): UseQueryResult<GetUser | null> => {
    const user_service = get_frontend_service().users;

    return useQuery({
        queryKey: ["user", user_id],
        queryFn: async () => {
            return await user_service.get_user(user_id);
        },
        staleTime: Infinity,
    })
}