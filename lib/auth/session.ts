import { createHmac, timingSafeEqual } from "crypto";

const SECRET =
  process.env.AUTH_SECRET || "dev-insecure-secret-change-me-in-production";

export const SESSION_COOKIE = "mnm_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

interface SessionPayload {
  uid: string;
  exp: number; // epoch ms
}

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

/** Create a signed session token for a user id. */
export function createSessionToken(uid: string): string {
  const payload: SessionPayload = {
    uid,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

/** Verify a session token; returns the user id if valid, else null. */
export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expectedSig = sign(data);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(data, "base64url").toString()
    ) as SessionPayload;
    if (!payload.uid || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return payload.uid;
  } catch {
    return null;
  }
}
