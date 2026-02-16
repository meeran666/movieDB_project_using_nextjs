import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST ?? "",
    user: process.env.POSTGRES_USER ?? "",
    port: parseInt(process.env.POSTGRES_PORT ?? ""),
    database: process.env.POSTGRES_DB ?? "",
    password: process.env.POSTGRES_PASSWORD ?? "",
    ssl: false,
  },
  verbose: true,
  strict: true,
});
