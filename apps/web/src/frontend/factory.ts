import { get_connection_service } from "@/connection/factory";
import { SessionCacheService } from "@/frontend/cache/session-cache.service";
import { SessionService } from "./services/sessions.service";
import { UserCacheService } from "./cache/user-cache.service";
import { UserService } from "./services/users.service";

export const get_session_cache_service = () => ({
    users : new UserCacheService(),
    sessions : new SessionCacheService(),
})

export const get_frontend_service = () => {
    const connection_service = get_connection_service();
    const cache_service = get_session_cache_service();
    
    const user_service = new UserService(
        cache_service.users,
        connection_service,
    )
    const session_service = new SessionService(
        cache_service.sessions,
        connection_service,
    );

    return {
        sessions : session_service,
        users: user_service
    }
}