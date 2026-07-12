import { users } from "@/modules/users/users.table";
import { CreateUserInput } from '@/modules/users/users.type';
import get_logger from "@/lib/logging/logger-factory";
import { ServerError } from "@/exceptions/ServerError";
import { DB } from "@/db/types";

const logger = get_logger();

export class UserRepository{
    constructor(private readonly database : DB){}
    
    async create_user(user : CreateUserInput ){
        try {
            return await this.database
                    .insert(users)
                    .values(user)
                    .returning()
        } catch (error) {
            logger.error(error!.message, error!);
            throw new ServerError(error!.message);
        }
    }
}
