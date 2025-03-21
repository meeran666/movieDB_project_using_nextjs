import * as schema from '@/src/drizzle/schema.ts'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
// import { createConnection, Connection } from 'mysql2/promise'
import pg from 'pg'
const { Client } = pg
let db:
  | (NodePgDatabase<Record<string, never>> & {
      $client: pg.Client
    })
  | null = null

// type createConnectionArgs = {
//   host: string
//   user: string
//   port: number
//   database: string
//   password: string
// }

// const dbConfig: createConnectionArgs = {
//   host: process.env.DB_HOST ?? '172.17.0.1',
//   user: process.env.DB_USER ?? 'root',
//   port: parseInt(process.env.DB_PORT ?? '5500'),
//   database: process.env.DB_NAME ?? 'movie_db',
//   password: process.env.DB_PASSWORD ?? '0786',
// }
export default async function getDatabaseConection(): Promise<
  NodePgDatabase<Record<string, never>> & {
    $client: pg.Client
  }
> {
  let client: pg.Client | null = null

  if (db != null) return db
  try {
    client = new Client({
      host: process.env.DB_HOST ?? '172.17.0.1',
      user: process.env.DB_USER ?? 'meeran',
      port: parseInt(process.env.DB_PORT ?? '33066'),
      database: process.env.DB_NAME ?? 'movie_db',
      password: process.env.DB_PASSWORD ?? 'password',
    })
    await client.connect()
    console.log('connected with sqlserver')
    db = drizzle({ client: client })
    return db
  } catch (error) {
    console.error('sql connection error:', error)
    throw error
  }
}
