import { users } from "@/modules/users/users.table";
import { SelectUser, type CreateUserInput } from '@/modules/users/users.type';
import get_logger from "@/lib/logging/logger-factory";
import { DB } from "@/db/types";
import { DatabaseBoundary } from "../database-boundary";
import { eq, ilike, or } from "drizzle-orm";

const logger = get_logger();

export class UserRepository {
    constructor(private readonly database : DB){}

    @DatabaseBoundary("create user")
    async create_user(user : CreateUserInput){
        return await this.database
                .insert(users)
                .values(user)
                .returning()
    }

    @DatabaseBoundary("get user")
    async get_user(user_id: string) : Promise<SelectUser>{
        const [ user ] =  await this.database
                .select()
                .from(users)
                .where(eq(users.user_id, user_id));
        return user;
    }

    @DatabaseBoundary("get all user")
    async get_all(): Promise<SelectUser[]>{
        const all_users = await this.database
                    .select()
                    .from(users)
        return all_users;
    }

    @DatabaseBoundary("search user")
    async search_user(search: string): Promise<SelectUser[]>{
        return await this.database
                .select()
                .from(users)
                .where(or(
                    ilike(users.first_name, `${search}%`),
                    ilike(users.last_name, `${search}%`),
                    ilike(users.email, `${search}%`),
                ))
                .limit(10)
                ;
    }
}
