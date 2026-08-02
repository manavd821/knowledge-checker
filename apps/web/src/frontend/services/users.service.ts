import { ConnectionService } from "@/connection/connection-service";
import { UserCacheService } from "../cache/user-cache.service";
import { GetUser } from "@/shared/dto/users/get-user.dto";

export class UserService{
    constructor(
        private readonly user_cache : UserCacheService,
        private readonly connection_service : ConnectionService,  
    ){}
    async get_user(user_id: string) : Promise<GetUser | null>{
        let user = this.user_cache.get_user(user_id);
        if(!user){
            const res = await this.connection_service.get_user(user_id);
            if(!res.success){
                switch(res.code){

                }
                return null;
            }
            user = res.data;
            this.user_cache.set_user(user_id, user);
        }
        return user;
    }
    
}