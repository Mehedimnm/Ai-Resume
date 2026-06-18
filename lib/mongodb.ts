import { MongoClient, type Db } from "mongodb";

/**
 * Cached MongoDB client.
 *
 * In development, Next.js hot-reloads modules which would otherwise create a
 * new connection on every change and exhaust the connection pool. We cache the
 * client promise on the global object to reuse a single connection.
 */

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mnm_ai_resume";

if (!uri) {
  throw new Error(
    "MONGODB_URI is not set. Add it to your .env.local file (see .env.example)."
  );
}

const options = {};

let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mnmMongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mnmMongoClientPromise) {
    global._mnmMongoClientPromise = new MongoClient(uri, options).connect();
  }
  clientPromise = global._mnmMongoClientPromise;
} else {
  clientPromise = new MongoClient(uri, options).connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
