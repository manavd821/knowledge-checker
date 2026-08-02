import { UserRepository } from "@/modules/users/users.repository";
import { SelectUser } from "@/modules/users/users.type";
import { SearchUserQuery } from "@/modules/users/users.schema";

export class UserService{
    constructor(
        private readonly user_repo : UserRepository,
    ){}

    async get_user(user_id: string) : Promise<SelectUser>{
        return await this.user_repo.get_user(user_id);
    }
    async get_all_user() : Promise<SelectUser[]>{
        return await this.user_repo.get_all();
    }
    async search(params: SearchUserQuery) : Promise<SelectUser[]>{
        const {search} = params;
        if(search)
            return await this.user_repo.search_user(search);
        
        return await this.get_all_user();
    }

}