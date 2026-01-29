import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USER ?? "",
    port: parseInt(process.env.DB_PORT ?? ""),
    database: process.env.DB_NAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
    ssl: false,
  },
  verbose: true,
  strict: true,
});
