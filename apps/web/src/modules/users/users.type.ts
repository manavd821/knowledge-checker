import { InferSelectModel } from "drizzle-orm";
import { users } from "@/modules/users/users.table";

export interface CreateUserInput{
    user_id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
}

export type SelectUser = InferSelectModel<typeof users>;