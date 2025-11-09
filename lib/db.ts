// import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
// import pg from "pg";
// const { Client } = pg;
// let db:
//   | (NodePgDatabase<Record<string, never>> & {
//       $client: pg.Client;
//     })
//   | null = null;

// export default async function getDatabaseConection(): Promise<
//   NodePgDatabase<Record<string, never>> & {
//     $client: pg.Client;
//   }
// > {
//   let client: pg.Client | null = null;
//   console.log("db first time");
//   console.log(db);
//   if (db != null) {
//     console.log("already connected with database");
//     return db;
//   }
//   try {
//     client = new Client({
//       host: process.env.DB_HOST,
//       user: process.env.POSTGRES_USER,
//       port: parseInt(process.env.POSTGRES_PORT ?? "33066"),
//       database: process.env.POSTGRES_DB,
//       password: process.env.POSTGRES_PASSWORD,
//     });

//     await client.connect();
//     console.log("connected with sqlserver");
//     console.log("wow");
//     db = drizzle({ client: client });
//     return db;
//   } catch (error) {
//     console.error("sql connection error:", error);
//     throw error;
//   }
// }
//////////////////////////////////////////
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
