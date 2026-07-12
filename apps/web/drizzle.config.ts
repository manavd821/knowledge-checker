import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: [
    "./src/modules/index.ts",
    "./src/db/enums.ts"
  ],
  out: "./src/db/migrations",
  dbCredentials : {
    url : process.env.DATABASE_URL!,
  }
});
