import { CreateUser } from "@/lib/db/api/schema/users";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema/users";

export const createUser = 
    async (user : CreateUser) => await db
        .insert(users)
        .values(user)
        .returning();


