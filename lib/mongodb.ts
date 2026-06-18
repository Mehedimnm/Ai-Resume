import { MongoClient, type Db, type MongoClientOptions } from "mongodb";

/**
 * Cached MongoDB client.
 *
 * In development, Next.js hot-reloads modules which would otherwise create a
 * new connection on every change and exhaust the connection pool. We cache the
 * client promise on the global object to reuse a single connection.
 *
 * NOTE: we intentionally do NOT throw at module load if MONGODB_URI is missing,
 * because that turns every API route into an opaque 500. Instead getDb() throws
 * a clear, catchable error at call time.
 */

const dbName = process.env.MONGODB_DB || "mnm_ai_resume";

const options: MongoClientOptions = {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mnmMongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not set on the server.");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mnmMongoClientPromise) {
      global._mnmMongoClientPromise = new MongoClient(uri, options).connect();
    }
    return global._mnmMongoClientPromise;
  }

  return new MongoClient(uri, options).connect();
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
