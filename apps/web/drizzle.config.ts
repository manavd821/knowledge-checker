import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: [
    "./src/lib/db/schema/*",
    "./src/lib/db/enums.ts"
  ],
  out: "./src/lib/db/migrations",
  dbCredentials : {
    url : process.env.DATABASE_URL!,
  }
});
