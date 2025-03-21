import * as schema from '@/src/drizzle/schema.ts'
import { drizzle, MySql2Database } from 'drizzle-orm/mysql2'
import { createConnection, Connection } from 'mysql2/promise'
const db:
  | (MySql2Database<typeof schema> & {
      $client: Connection
    })
  | null = null

type createConnectionArgs = {
  host: string
  user: string
  port: number
  database: string
  password: string
}

const dbConfig: createConnectionArgs = {
  host: process.env.DB_HOST ?? '172.17.0.1',
  user: process.env.DB_USER ?? 'root',
  port: parseInt(process.env.DB_PORT ?? '5500'),
  database: process.env.DB_NAME ?? 'movie_db',
  password: process.env.DB_PASSWORD ?? '0786',
}
export default async function getDatabaseConection(): Promise<
  MySql2Database<typeof schema> & {
    $client: Connection
  }
> {
  let connection: Connection | null = null

  if (db != null) return db
  try {
    connection = await createConnection({
      host: process.env.DB_HOST ?? '172.17.0.1',
      user: process.env.DB_USER ?? 'meeran',
      port: parseInt(process.env.DB_PORT ?? '33066'),
      database: process.env.DB_NAME ?? 'movie_db',
      password: process.env.DB_PASSWORD ?? 'password',
    })
    isConnected = true
    console.log('connected with sqlserver')
    const db = drizzle(connection, { schema, mode: 'default' })
    return db
  } catch (error) {
    console.error('sql connection error:', error)
    throw error
  }
}
