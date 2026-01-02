import "dotenv/config";
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DB_HOST ?? "172.23.226.7",
    user: process.env.DB_USER ?? "meeran",
    port: parseInt(process.env.DB_PORT ?? "5432"),
    database: process.env.DB_NAME ?? "movie_db",
    password: process.env.DB_PASSWORD ?? "password",
    ssl: false,
  },
  verbose: true,
  strict: true,
});
