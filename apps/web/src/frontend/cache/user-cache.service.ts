import { ConfigurationError } from "@/exceptions/ConfigurationError";
import { LiveSessionInfo } from "@/modules";
import { GetUser } from "@/shared/dto/users/get-user.dto";

export class UserCacheService{
    constructor(){}

    get_user(user_id : string) : GetUser | null{
        const key = `user_cache:${user_id}`;
        
        try {
            const data_str = sessionStorage.getItem(key);
            if(!data_str) return null;
            const data : GetUser = JSON.parse(data_str);
            return data;
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse user cache data for user_id:${user_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }
    
    set_user(user_id: string, data : GetUser) : void{
        const key = `user_cache:${user_id}`;
        try {
            sessionStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            throw new ConfigurationError(
                `Failed to parse user data for user_id:${user_id} . Error: ${(error as Error).message}` ,
                {error}
            )
        }
    }
}