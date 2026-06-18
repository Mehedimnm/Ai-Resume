import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/current";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
