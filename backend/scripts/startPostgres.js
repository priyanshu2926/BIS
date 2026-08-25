import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import net from 'net';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// PGlite uses its own data format. Keep it separate from the legacy PostgreSQL
// data directory checked into this project so a stale postmaster file cannot
// prevent the bundled development database from starting.
const dbPath = path.resolve(__dirname, '../prisma/pglite-data');

/**
 * Detect a native PostgreSQL data directory copied into the PGlite path.
 * PGlite also creates postgresql.conf, so we only flag dirs that have a
 * postmaster.pid left over from a real PostgreSQL server (not PGlite).
 */
function isLegacyPostgresDataDir(dirPath) {
  if (!fs.existsSync(dirPath)) return false;
  const pidFile = path.join(dirPath, 'postmaster.pid');
  if (!fs.existsSync(pidFile)) return false;
  try {
    const firstLine = fs.readFileSync(pidFile, 'utf8').split('\n')[0].trim();
    // Real PostgreSQL postmaster.pid starts with a numeric PID; PGlite does not use this format.
    return /^\d+$/.test(firstLine);
  } catch {
    return false;
  }
}

function resetDataDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

async function createPgliteInstance(dirPath) {
  const db = new PGlite(dirPath);
  await db.query('SELECT 1');
  return db;
}

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

  let schemaNeedsSync = !fs.existsSync(dbPath);

  if (isLegacyPostgresDataDir(dbPath)) {
    console.warn(`[Database] Removing incompatible PostgreSQL data at ${dbPath}. PGlite requires its own format.`);
    resetDataDir(dbPath);
    schemaNeedsSync = true;
  }
  let db;
  try {
    db = await createPgliteInstance(dbPath);
  } catch (err) {
    if (String(err?.message || err).includes('failed to initialize')) {
      console.warn(`[Database] PGlite data at ${dbPath} is corrupt or incompatible. Recreating...`);
      resetDataDir(dbPath);
      schemaNeedsSync = true;
      db = await createPgliteInstance(dbPath);
    } else {
      throw err;
    }
  }

  const server = new PGLiteSocketServer({ db, port, host: '127.0.0.1', maxConnections: 100 });
  await server.start();
  console.log(`[Database] Local PostgreSQL wire-protocol server listening on 127.0.0.1:${port} (maxConnections: 100, data: ${dbPath})`);

  if (schemaNeedsSync) {
    console.warn('[Database] Fresh PGlite database created. Run "npm run db:push" once to apply the schema.');
  }

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
