import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
let db: ReturnType<typeof drizzle>;
try {
  const connectionPool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT, 10)
      : 5432,
  });
  db = drizzle(connectionPool);
} catch (error) {
  console.error("sql connection error:", error);
  throw error;
}
export { db };
