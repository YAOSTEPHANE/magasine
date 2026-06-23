import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  canManageArticles,
  canManageUsers,
  isAdminRole,
  isSuperAdmin,
} from "@/lib/permissions";
import type { UserRole } from "@/types";

type AdminGuard = "articles" | "editorial" | "users" | "super";

const GUARDS: Record<AdminGuard, (role?: UserRole) => boolean> = {
  articles: canManageArticles,
  editorial: isAdminRole,
  users: canManageUsers,
  super: isSuperAdmin,
};

export async function requireAdminApi(guard: AdminGuard = "articles") {
  const session = await auth();
  const check = GUARDS[guard];

  if (!session?.user || !check(session.user.role)) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 403 }) };
  }

  return { session };
}
