import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./session";
import { findById, toPublic, type PublicUser } from "./store";

/** Read the current authenticated user from the session cookie (server only). */
export async function getCurrentUser(): Promise<PublicUser | null> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const uid = verifySessionToken(token);
  if (!uid) return null;
  const user = await findById(uid);
  return user ? toPublic(user) : null;
}
