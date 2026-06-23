import { NextResponse } from "next/server";
import {
  DEFAULT_ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  ensureDefaultAdmin,
} from "@/lib/ensure-admin";

/** Dev only — crée ou répare le compte admin seed. */
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }

  const admin = await ensureDefaultAdmin({ resetPassword: true });

  return NextResponse.json({
    ok: true,
    email: admin.email,
    password: DEFAULT_ADMIN_PASSWORD,
    created: admin.created,
    repaired: admin.repaired,
    loginUrl: "/login",
    adminUrl: "/admin",
  });
}
