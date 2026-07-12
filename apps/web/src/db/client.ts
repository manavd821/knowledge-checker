import { drizzle } from 'drizzle-orm/node-postgres';
import { env } from "@/config/env";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
    connectionString: env.DATABASE_URL
})

export const db = drizzle(pool);