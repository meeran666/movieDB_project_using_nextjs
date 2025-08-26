import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";
const { Client } = pg;
let db:
  | (NodePgDatabase<Record<string, never>> & {
      $client: pg.Client;
    })
  | null = null;

export default async function getDatabaseConection(): Promise<
  NodePgDatabase<Record<string, never>> & {
    $client: pg.Client;
  }
> {
  let client: pg.Client | null = null;

  if (db != null) {
    console.log("already connected with database");
    return db;
  }
  try {
    client = new Client({
      host: process.env.DB_HOST ?? "172.17.0.1",
      user: process.env.POSTGRES_USER ?? "meeran",
      port: parseInt(process.env.POSTGRES_PORT ?? "33066"),
      database: process.env.POSTGRES_DB ?? "movie_db",
      password: process.env.POSTGRES_PASSWORD ?? "password",
    });

    await client.connect();
    console.log("connected with sqlserver");
    console.log("wow");
    db = drizzle({ client: client });
    return db;
  } catch (error) {
    console.error("sql connection error:", error);
    throw error;
  }
}
