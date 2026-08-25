import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../prisma/pgdata');

process.on('uncaughtException', (err) => {
  console.error('[Database Server uncaughtException]:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.error('[Database Server unhandledRejection]:', err);
});

export async function isPortInUse(port = 5432) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(800);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => {
      resolve(false);
    });
    socket.connect(port, '127.0.0.1');
  });
}

export async function startPostgresServer(port = 5432) {
  const inUse = await isPortInUse(port);
  if (inUse) {
    console.log(`[Database] PostgreSQL server already active on port ${port}.`);
    return null;
  }

  const db = new PGlite(dbPath);
  const server = new PGLiteSocketServer({ db, port, host: '0.0.0.0', maxConnections: 100 });
  await server.start();
  console.log(`[Database] Local PostgreSQL wire-protocol server listening on 0.0.0.0:${port} (maxConnections: 100, data: ${dbPath})`);
  return server;
}

// If executed directly:
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startPostgresServer(5432).then((server) => {
    if (server) {
      setInterval(() => {}, 1 << 30);

      process.on('SIGINT', async () => {
        console.log('\n[Database] Stopping PostgreSQL server...');
        await server.stop();
        process.exit(0);
      });
      process.on('SIGTERM', async () => {
        await server.stop();
        process.exit(0);
      });
    }
  }).catch((err) => {
    console.error('[Database] Failed to start PostgreSQL server:', err);
    process.exit(1);
  });
}
