import type { UserRole } from "@/types";

const ADMIN_ROLES: UserRole[] = ["super_admin", "admin", "editor"];
const EDITOR_ROLES: UserRole[] = ["super_admin", "admin", "editor", "author"];

export function isAdminRole(role?: UserRole): boolean {
  return role !== undefined && ADMIN_ROLES.includes(role);
}

export function canManageArticles(role?: UserRole): boolean {
  return role !== undefined && EDITOR_ROLES.includes(role);
}

export function canManageUsers(role?: UserRole): boolean {
  return role === "super_admin" || role === "admin";
}

export function isSuperAdmin(role?: UserRole): boolean {
  return role === "super_admin";
}

export function canAccessPremium(
  isPremiumArticle: boolean,
  user?: { isPremium: boolean; role: UserRole } | null
): boolean {
  if (!isPremiumArticle) return true;
  if (!user) return false;
  if (user.isPremium) return true;
  return isAdminRole(user.role) || user.role === "author";
}
