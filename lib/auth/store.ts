import { randomUUID } from "crypto";
import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";

/**
 * MongoDB-backed user store.
 *
 * Users are stored in the "users" collection with a unique index on email.
 * Public APIs (findByEmail, findById, createUser) are async.
 */

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
}

let indexesReady = false;

async function users(): Promise<Collection<UserRecord>> {
  const db = await getDb();
  const collection = db.collection<UserRecord>("users");
  if (!indexesReady) {
    await collection.createIndex({ email: 1 }, { unique: true });
    await collection.createIndex({ id: 1 }, { unique: true });
    indexesReady = true;
  }
  return collection;
}

export function toPublic(user: UserRecord): PublicUser {
  return { id: user.id, name: user.name, email: user.email };
}

export async function findByEmail(
  email: string
): Promise<UserRecord | null> {
  const normalized = email.trim().toLowerCase();
  const col = await users();
  return col.findOne({ email: normalized });
}

export async function findById(id: string): Promise<UserRecord | null> {
  const col = await users();
  return col.findOne({ id });
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<UserRecord> {
  const col = await users();
  const user: UserRecord = {
    id: randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    passwordHash: input.passwordHash,
    createdAt: new Date().toISOString(),
  };
  await col.insertOne(user);
  return user;
}
