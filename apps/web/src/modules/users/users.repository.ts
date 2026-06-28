import { CreateUser } from "@/modules/users/users.schema";
import { db } from "@/db/client";
import { users } from "@/modules/users/users.table";

export const createUser = 
    async (user : CreateUser) => await db
        .insert(users)
        .values(user)
        .returning();


