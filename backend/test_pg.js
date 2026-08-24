import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';

const dbPath = './prisma/pgdata';
const db = new PGlite(dbPath);
const server = new PGLiteSocketServer({ db, port: 5432 });

async function start() {
  await server.start();
  console.log('PostgreSQL (PGlite) server running on port 5432');
}

start().catch(console.error);
