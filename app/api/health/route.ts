import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint. Reports which server env vars are present (booleans only,
 * never the values) and whether a MongoDB connection can be established.
 * Safe to expose: it leaks no secrets.
 */
export async function GET() {
  const env = {
    MONGODB_URI: Boolean(process.env.MONGODB_URI),
    MONGODB_DB: Boolean(process.env.MONGODB_DB),
    AUTH_SECRET: Boolean(process.env.AUTH_SECRET),
    GEMINI_API_KEY: Boolean(process.env.GEMINI_API_KEY),
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
  };

  let database: { ok: boolean; error?: string } = { ok: false };
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    database = { ok: true };
  } catch (err) {
    database = {
      ok: false,
      error: err instanceof Error ? err.message : "unknown error",
    };
  }

  return NextResponse.json({ status: "ok", env, database });
}
